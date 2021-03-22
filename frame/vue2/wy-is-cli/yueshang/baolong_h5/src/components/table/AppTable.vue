<template>
    <div class="app-table" :class="tplClasses">
        <div class="app-table__head">
            <div class="app-table__head__item left-fixed">
                <app-table-column :items="tplColumnsMap.left" @on-column-click="onColumnClick">
                    <template #column-icon="scope">
                        <i
                            :class="[
                                'sortable',
                                component.sortBy.key === scope.key ? { asc: 'up', desc: 'down' }[component.sortBy.direction] || '' : '',
                            ]"
                        ></i>
                    </template>
                </app-table-column>
            </div>
            <div class="app-table__head__item">
                <app-table-column :items="tplColumnsMap.normal" @on-column-click="onColumnClick">
                    <template #column-icon="scope">
                        <i
                            :class="[
                                'sortable',
                                component.sortBy.key === scope.key ? { asc: 'up', desc: 'down' }[component.sortBy.direction] || '' : '',
                            ]"
                        ></i>
                    </template>
                </app-table-column>
            </div>
        </div>
        <div class="app-table__body">
            <div class="app-table__body__row" v-for="(row, rowi) in tplRows" :key="rowi">
                <div class="app-table__body__row__items left-fixed">
                    <app-table-column :items="tplColumnsMap.left" :row="row"></app-table-column>
                </div>
                <div class="app-table__body__row__items">
                    <app-table-column :items="tplColumnsMap.normal" :row="row"></app-table-column>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppTableColumn from './AppTableColumn';

export default {
    name: 'AppTable',
    components: {
        AppTableColumn,
    },
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
        rows: {
            type: Array,
            default: () => [],
        },
        headFixed: {
            type: Boolean,
            default: () => false,
        },
        bordered: {
            type: Boolean,
            default: () => false,
        },
    },
    data: () => {
        return {
            component: {
                rows: [],
                sortBy: {
                    key: null,
                    direction: null,
                },
            },
        };
    },
    computed: {
        tplClasses() {
            return {
                ['head-fixed']: this.headFixed,
                bordered: this.bordered,
            };
        },
        tplColumnsMap() {
            return (this.columns || []).reduce(
                (result, column) => {
                    switch (column.fixed) {
                        case true:
                            result.left.push(column);
                            break;
                        default:
                            result.normal.push(column);
                            break;
                    }
                    return result;
                },
                { left: [], normal: [], right: [] },
            );
        },
        tplRows() {
            return [...this.component.rows];
        },
    },
    methods: {
        onColumnClick({ ...column }) {
            const payload = { ...column };
            if (column.sortable) {
                (typeof column.sortable === 'function'
                    ? column.sortable
                    : (payload) => {
                          if (!payload.key) {
                              console.error('没有配置「key」，不能进行排序');
                          }
                          const { key: sortKey, direction: sortDirection } = this.component.sortBy;
                          const direction = {
                              asc: 'desc',
                              desc: null,
                              null: 'asc',
                          }[sortKey !== column.key ? null : sortDirection];
                          this.component.sortBy.key = column.key;
                          this.component.sortBy.direction = direction;
                          this.component.rows = direction
                              ? [...this.rows].sort((a, b) => {
                                    return (a[column.key] > b[column.key] ? 1 : -1) * (direction === 'asc' ? 1 : -1);
                                })
                              : [...this.rows];
                      })(payload);
            } else if (typeof column.click === 'function') {
                column.click(payload);
            } else {
                this.$emit('on-column-click', payload);
            }
        },
    },
    created() {
        this.component.rows = [...this.rows];
    },
};
</script>

<style lang="scss">
.app-table {
    position: relative;
    width: 100%;
    height: 100%;

    &.head-fixed &__head {
        position: sticky;
        z-index: 2;
        top: 0;
        background-color: #ffffff;
    }

    &.bordered {
        .app-table-column {
            &__item {
                border-color: #cccccc;
            }
        }
    }

    .left-fixed {
        position: sticky;
        z-index: 1;
        left: 0;
        background-color: #ffffff;
    }

    &__head {
        display: inline-flex;
        min-width: 100%;
        white-space: nowrap;
        &__item {
            &:not(.left-fixed) {
                flex: 1;
            }
            &:last-child > .app-table-column:last-child > .app-table-column__item:last-child {
                border-right: none;
            }

            i.sortable {
                display: inline-block;
                width: 12px;
                height: 12px;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                background-image: url(../../assets/images/icon-sortable.png);
                &.up {
                    background-image: url(../../assets/images/icon-sortup.png);
                }
                &.down {
                    background-image: url(../../assets/images/icon-sortdown.png);
                }
            }
        }
    }

    &__body__row {
        display: inline-flex;
        min-width: 100%;
        white-space: nowrap;
        &__items {
            &:not(.left-fixed) {
                flex: 1;
            }
            &:last-child > .app-table-column:last-child > .app-table-column__item:last-child {
                border-right: none;
            }
        }
    }
}
</style>
