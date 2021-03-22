<template>
    <div class="app-table-column" :class="{ 'value--mode': !!row }">
        <div class="app-table-column__item" v-for="(item, itemi) in tplItems" :key="itemi" :style="item.style">
            <div class="app-table-column__item__label" :class="{ sortable: item.sortable }" @click="onColumnClick(item.$payload)">
                {{ item.label }}
                <div class="app-table-column__item__label__icon" v-if="item.sortable">
                    <slot name="column-icon" v-bind="item" />
                </div>
            </div>
            <div class="app-table-column__item__children" v-if="item.children">
                <app-table-column :items="item.children" :row="row" @on-column-click="onColumnClick">
                    <template #column-icon="scope">
                        <slot name="column-icon" v-bind="scope" />
                    </template>
                </app-table-column>
            </div>
            <div class="app-table-column__item__value" v-if="item.key && row && !item.children">
                {{ (row || {})[item.key] | formatNumber }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppTableColumn',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        row: {
            type: Object,
            default: () => null,
        },
    },
    computed: {
        tplItems() {
            return this.items.map((item) => {
                const { width, ...column } = item;
                return {
                    style: {
                        width,
                        flex: width ? 'none' : 1,
                    },
                    ...column,
                    $payload: { ...item },
                };
            });
        },
    },
    methods: {
        onColumnClick({ ...column }) {
            this.$emit('on-column-click', column);
        },
    },
};
</script>

<style lang="scss">
.app-table-column {
    display: inline-flex;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #cccccc;
    &__item {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        border-right: 1px solid transparent;
        &__label,
        &__value {
            flex: 1;
            display: flex;
            align-items: center;
            padding: 4px 8px;
            white-space: pre-line;
            word-break: break-all;
            width: auto;
            min-width: 50px;
            &.sortable {
                position: relative;
                padding-right: 16px;
                .app-table-column__item__label__icon {
                    position: absolute;
                    top: 50%;
                    right: 8px;
                    transform: translateY(-50%);
                }
            }
        }
        &__children {
            flex: 1;
            display: flex;
            align-items: center;
            border-top: 1px solid #cccccc;
            .app-table-column {
                border-bottom: none;
                &__item:last-child {
                    border-right: none;
                }
            }
        }
    }

    &.value--mode {
        .app-table-column__item {
            &__label,
            &__children {
                border-top-width: 0;
            }
            &__label {
                position: absolute;
                top: -9999px;
            }
        }
    }
}
</style>
