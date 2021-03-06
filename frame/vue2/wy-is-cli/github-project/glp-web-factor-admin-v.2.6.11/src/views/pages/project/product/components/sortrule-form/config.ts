export class ArrayItem {
  sellerId!: number | string
  bankCardId!: number | string
  accountNo!: number | string
  options!: Array<Record<string, number | string>>
  bankOptions!: Array<Record<string, number | string>>
}
