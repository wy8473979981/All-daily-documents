/*
 * @Author: fhj
 * @LastEditors: fhj
 * @Description:
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Jiinfo Admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
