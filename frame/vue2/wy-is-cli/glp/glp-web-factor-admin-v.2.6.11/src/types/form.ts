import { FormDef, FieldDef, TableDef, ControlDef } from 'glp-ui/package/components/form-render/type'

export { FormDef, FieldDef, TableDef, ControlDef }

export interface GridFieldDef {
  span?: number;
  xl?: number;
  offset?: number;
  push?: number;
  pull?: number;
  def: ControlDef;
}
