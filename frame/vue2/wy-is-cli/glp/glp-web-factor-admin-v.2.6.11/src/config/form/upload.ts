import { oosRequest } from '@/utils/oos'

export const resp = (response: any) => response

export const request = oosRequest

export const action = 'http://localhost:3000/nas/upload'

export const uploadType: 'card' | 'list' = 'card'

const accept = 'image/jpeg,image/jpg,image/png,.pdf,.doc,.docx,.xls,.xlsx,.zip'

const tip = '（支持PDF、JPEG、DOCX、XLSX、ZIP格式，上传附件不超过20个，每个附件大小不超过100M）'

const limit = 20

export const uploadOptions = { resp, request, action, type: uploadType, tip, limit, accept, maxSize: '100M' }

export const uploadToRequest = (file: any[] = []) => file.map((v: any) => ({ fileName: v.name, filePath: v.url }))

export const uploadFromResp = (file: any[] = []) => file.map((v: any) => ({ name: v.fileName, url: v.filePath }))
