type TupleToUnion<T extends any[]> = T[number]
type s = TupleToUnion<[123, '456', true]>
