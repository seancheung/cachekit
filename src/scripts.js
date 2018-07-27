module.exports = {
    COUNT: 'local keys=redis.call("keys",ARGV[1]);return #keys',
    SETX:
        'local ttl=redis.call("ttl",KEYS[1]);if ttl>0 then return redis.call("set",KEYS[1],ARGV[1],"EX",ttl) elseif ttl==-1 then return redis.call("set",KEYS[1],ARGV[1]) end',
    ZMSCORE:
        'local r={};for i,k in ipairs(ARGV) do r[i]=redis.call("zscore",KEYS[1],k) end;return r',
    JGET:
        'local r=redis.call("get",KEYS[1]);if not r then return end;r=cjson.decode(r);while #ARGV>0 do if not r then return end;local t=table.remove(ARGV,1);local n;if string.byte(t)==91 and string.byte(t,#t)==93 then n=tonumber(string.sub(t,2,#t-1)) end;if n then r=r[n+1] else r=r[t] end end;r=cjson.encode(r);return r',
    JSET:
        'local r=redis.call("get",KEYS[1]);if not r then return end;r=cjson.decode(r);local p=r;local c=r;local t,n;while #ARGV>1 do p=c;t=table.remove(ARGV,1);if string.byte(t)==91 and string.byte(t,#t)==93 then n=tonumber(string.sub(t,2,#t-1)) else n=nil end;if n then c=p[n+1] else c=p[t] end end;local v=cjson.decode(ARGV[1]);if n then p[n+1]=v else p[t]=v end;r=cjson.encode(r);redis.call("set",KEYS[1],r);return "OK"',
    HJGET:
        'local f=table.remove(ARGV,1);local r=redis.call("hget",KEYS[1],f);if not r then return end;r=cjson.decode(r);while #ARGV>0 do if not r then return end;local t=table.remove(ARGV,1);local n;if string.byte(t)==91 and string.byte(t,#t)==93 then n=tonumber(string.sub(t,2,#t-1)) end;if n then r=r[n+1] else r=r[t] end end;r=cjson.encode(r);return r',
    HJSET:
        'local f=table.remove(ARGV,1);local r=redis.call("hget",KEYS[1],f);if not r then return end;r=cjson.decode(r);local p=r;local c=r;local t,n;while #ARGV>1 do p=c;t=table.remove(ARGV,1);if string.byte(t)==91 and string.byte(t,#t)==93 then n=tonumber(string.sub(t,2,#t-1)) else n=nil end;if n then c=p[n+1] else c=p[t] end end;local v=cjson.decode(ARGV[1]);if n then p[n+1]=v else p[t]=v end;r=cjson.encode(r);redis.call("hset",KEYS[1],f,r);return "OK"',
    FLUSH:
        'local keys=redis.call("keys",ARGV[1]);if #keys>0 then for i=1,#keys,5000 do redis.call("del",unpack(keys,i,math.min(i+4999,#keys))) end end;return #keys'
};
