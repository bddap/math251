from parser import parse

def read(f):
    with open(f) as g:
        return parse(c for l in g for c in l)

def replace(e, varname, value):
    if e == varname:
        return value
    if type(e) is str:
        return e
    return tuple(replace(a, varname, value) for a in e)

rules = dict(read('rules.cas'))
print(rules)

def eval(e):
    if type(e) is str:
        return e
    if e[0] == '`':
        if e[1] == 'x':
            return '1'
        if type(e[1]) is str:
            return e[1]
        form = rules[e[1][0]]
        a = e[1][1]
        b = e[1][2]
        return eval(
            replace(replace(form, 'a', a), 'b', b)
        )
    return tuple(map(eval, e))
        
test = read('test.cas')
print(test[0])
print(eval(test[0]))
print(eval(('`', test[0])))

'''
(p (^ a b) (a b) (* b (^ a (- b 1))))              
(p (+ a b) (+ (p a) (p b)))                                                 
(p (- a b) (- (p a) (p b)))                                                  
(p (* a b) (+ (* a (p b)) (* (p a) b)))                                       
(p (/ a b) (/ (- (* (p a) b) (* (p b) a) ) (^ b 2))
'''
