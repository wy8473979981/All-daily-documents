<template>
    <div class="test-table-view">
        <app-table v-bind="tplTable"></app-table>
    </div>
</template>

<script>
import AppTable from '@/components/table/AppTable';

// const random = ['--', '1,000', '10,000', '-1,000', '1,234.00', '1,100,000'];

export default {
    name: 'TestTableView',
    components: {
        AppTable,
    },
    computed: {
        tplTable() {
            return {
                headFixed: true,
                columns: [
                    { key: 'col1', label: '列1', fixed: true, sortable: true },
                    {
                        label: '配送信息',
                        children: [
                            { key: 'name', label: '姓名' },
                            {
                                label: '地址',
                                children: [
                                    { key: 'province', label: '省份' },
                                    { key: 'city', label: '城市', sortable: true },
                                    { key: 'address', label: '地址' },
                                ],
                            },
                        ],
                    },
                    { key: 'col3', label: '列3', sortable: true, width: '120px' },
                    {
                        label: '组1',
                        children: [
                            { key: 'g11', label: '组1-1' },
                            { key: 'g12', label: '组1-2', sortable: true },
                            { key: 'g13', label: '组1-3' },
                        ],
                    },
                    { key: 'col4', label: '列4', fixed: 'right' },
                    {
                        label: '组2',
                        children: [
                            { key: 'g21', label: '组2-1' },
                            { key: 'g22', label: '组2-2' },
                            { key: 'g23', label: '组2-3' },
                        ],
                    },
                ],
                rows: Array(100)
                    .fill(0)
                    .map((item, itemi) => {
                        return {
                            col1: `列1 - 数据${itemi + 1}`,
                            col2: `列2 - 数据${itemi + 1}`,
                            col3: parseFloat((Math.random() * 100000).toFixed(2)),
                            col4: `列4 - 数据${itemi + 1}`,
                            g11: `组11 - 数据${itemi + 1}`,
                            g12: `组12 - 数据${itemi + 1}`,
                            g13: `组13 - 数据${itemi + 1}`,
                            g21: `组21 - 数据${itemi + 1}`,
                            g22: `组22 - 数据${itemi + 1}`,
                            g23: `组23 - 数据${itemi + 1}`,
                            province: `省份 - 数据${itemi + 1}`,
                            city: `城市 - 数据${itemi + 1}`,
                            address: `地址 - 数据${itemi + 1}`,
                        };
                    }),
            };
        },
    },
};
</script>
