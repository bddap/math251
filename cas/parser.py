
def takeTillAny(s, cs):
    for c in s:
        yield c
        if c in cs:
            break

def dontBeLazy(f):
    return lambda a: tuple(f(a))
        
@dontBeLazy
def parse(s):
    "yields the lisp elements in s, consuming s through it's close"

    while True:
        a = next(s)
        if a in ' \n':
            continue
        elif a == ')':
            break
        elif a == '(':
            yield parse(s)
        else:
            b = ''.join(takeTillAny(s, ' \n)'))
            yield a + b[:-1]
            if b[-1] == ')':
                break

# print('(- 0 (/ (* 2 (^ x 2)) 9))')
# print(parse(iter('(- 0 (/ (\n*     2 ( ^ x \n2 ))  9))')))
