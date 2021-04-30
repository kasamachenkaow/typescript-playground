// v4.2.3

type AmazingIntersect<T1, T2> = 
  T1 extends Record<infer UKey1, unknown> ? 
    T2 extends Record<infer UKey2, infer UVal2> ?
      UKey2 extends UKey1 ?
        [T1[UKey2], UVal2] extends [(infer UT1)[], (infer UT2)[]] ?
          Omit<T1, UKey2> & Omit<T2, UKey2> & Record<UKey2, (UT1 & UT2)[]>:
          T1 & T2:
        T1 & T2:
      T1 & T2:
    T1 & T2

type RA1 = Record<'R1', string>
type RA2 = Record<'R2', string>
type RA3 = Record<'captures', Record<'R3', string>[]>
type RA4 = Record<'captures', Record<'R4', string>[]>
type RA5 = Record<'captures', Record<'R5', string>[]> 
type TA1 = Record<'transaction', Record<'T1', string>[]>
type TA2 = Record<'transaction', Record<'T2', string>[]>

type LoopIntersect<T> = 
  T extends [infer U1, infer U2, ...infer Us] ? LoopIntersect<[AmazingIntersect<U1, U2>, ...Us]> : 
  T extends [infer Us] ? Us : never

type AR = LoopIntersect<[RA1, RA2, RA3, RA4, RA5, TA1, TA2]>

const ar: AR = {
  R1: 's',
  R2: 's',
  captures: [{
    R3: 's',
    R4: 's',
    R5: 's',
  }],
  transaction: [{
    T1: 's',
    T2: 's',
  }]
}

ar.captures[0].R3
ar.captures[0].R4
ar.captures[0].R5
ar.captures.map(r => r.R3 && r.R4 && r.R5)

ar.transaction[0].T1
ar.transaction[0].T2
ar.transaction.map(t => t.T1 && t.T2)
