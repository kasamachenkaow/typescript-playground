type ArrayType<T> = T extends Array<infer U> ? U : T

type IntersectArray<T1, T2> = Array<ArrayType<T1> & ArrayType<T2>> 

type RA1 = Record<'R1', string>
type RA2 = Record<'R2', string>
type RA3 = { captures: Record<'R3', string>[] }
type RA4 = { captures: Record<'R4', string>[] }
type RA5 = { captures: Record<'R5', string>[] }

type UR = RA1 | RA2 | RA3 | RA4
type AR = RA1 & RA2 & RA3 & RA4

type CapturesIntersect<T1, T2> = 
  T1 extends { captures: (infer U1)[] } ? 
    T2 extends { captures: (infer U2)[] } ?
      Omit<T1, 'captures'> & Omit<T2, 'captures'> & { captures: (U1 & U2)[] } :
      T1 & T2 :
    T1 & T2
    
type AR2 = CapturesIntersect<CapturesIntersect<CapturesIntersect<CapturesIntersect<RA1, RA2>, RA3>, RA4>, RA5>

const ar: AR2 = {
  R1: 's',
  R2: 's',
  captures: [
      {
          R3: 's',
          R4: 's',
          R5: 's',
      }
  ]  
}

ar.captures[0].R5
ar.captures.map(r => r.R5)
