import { FormDef, FieldDef, TableDef } from 'glp-ui/package/components/form-render/type'

export { FormDef, FieldDef, TableDef }

export interface GridFieldDef {
  span?: number;
  xl?: number;
  def: FieldDef;
}
