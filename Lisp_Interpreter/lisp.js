var Env={}
var l=new Array()
var ex=new Array()
var q=-1
function dictup(parms,args){
  Env[parms]=args
}
function find(va){
  if(va in Env){return Env}
}
function addglo(){
  obs=Object.getOwnPropertyNames(Math)
  for( each in obs){
    Env[obs[each]]=Math[obs[each]]
  }
  Env['+']=function(x,y){return x+y},Env['-']=function(x,y){return x-y},Env['*']=function(x,y){return x*y},Env['/']=function(x,y){return x/y},Env['not']=function(x,y){return x!=y},Env['>']=function(x,y){return x>y},Env['<']=function(x,y){return x<y},Env['>=']=function(x,y){return x>=y},Env['<=']=function(x,y){return x<=y},Env['=']=function(x,y){return x==y},Env['equal?']=function(x,y){return x==y},Env['length']=function(x){return x.length},Env['cons']=function(x,y){return [x]+y},Env['car']=function(x){return x[0]},Env['cdr']=function(x){return x.slice(1)},Env['append']=function(x,y){return x+y},Env['list?']=function(x){return Array.isArray(x)},Env['null?']=function(x){ return x==[]},Env['symbol?']=function(x){return typeof x == 'string'}
}
function eval(x){
  if(x[0]=='define'){
    vari=x[1],exp=x[2]
    Env[vari]=eval(exp)
  }
  else if(x[0]=='lambda'){
    vari2=x[1],exp2=x[2]
    b= function(v){
        dictup(vari2,v)
        return eval(exp2)
    }
    return b
  }
  else if(x[0]=='quote'){
    exp3=x[1]
    return exp3
  }
  else if(x[0]=='if'){
    test=x[1],conseq=x[2],alt=x[3]
    if(eval(test)){return eval(conseq)}
    else{return eval(alt)}
  }
  else if(x[0]=='set!'){
    vari3=x[1],exp4=x[3]
    find(vari3)[vari3]=eval(expii)
  }
  else if(x[0]=='begin'){
    x=x.slice(1)
    for (e in x){val=eval(x[e])}
    return val
  }
  else if(typeof x == typeof ''){
    a=find(x)[x]
    return a
  }
  else if(typeof x !='object'){
    return x
  }
  else{
    q+=1
    ex[q]=new Array()
    for (exps in x){ex[q].push(eval(x[exps]))}
    r=ex[q].slice(1)
    function run(k,r){return k.apply(null,r)}
    u=run(ex[q][0],r)
    ex.pop()
    q-=1
    return u
 }
}




function read(s){
  f=''
  for (i in s){
    if(s[i]=='('){f=f+'( '}
    else if(s[i]==')'){f=f+' )'}
    else{f=f+s[i]}
  }
  d=f.split(" ")
  return d
}
function readfrom(n){
  if (tokens.length==0){
    console.log("unexpected EOF")
    return
  }
  token=tokens[0]
  tokens=tokens.slice(1)
  if('('==token){
    n+=1
    l[n]=new Array()
    while(tokens[0]!=')'){
      l[n].push(readfrom(n))
      }
    tokens=tokens.slice(1)
    return l[n]
  }
  else if(')'==token){console.log("unexpected )")}
  else{return atom(token)}
}
function atom(token){
 if(isNaN(token)){return token}
 else{
   for (i in token){
     if(token[i]=='.'){return parseFloat(token)}
   }
   return parseInt(token)
 }
}   
function repl(){
    if(con==2){
      val=read('(define fact (lambda (n) (if (<= n 1) 1 (* n (fact (- n 1))))))')
      con-=1     
    }
    else if(con==1){
      val=read('(fact 5)')
      con-=1
    }
    return val
}

con=2
addglo()
while(con>0){
 tokens=repl()
 n=-1
 a=readfrom(n)
 v=eval(a)
}
console.log("RESULT",v)



