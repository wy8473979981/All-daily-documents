<template>
    <div :class="['public-box', { disabled: form.bizEntityJson.disabled }]">
        <el-row>
            <dl-col
                :span="24"
                title="项目类型:"
                :novalue="
                    form.bizEntityJson.isProjectTypeB1 != 'true' &&
                    form.bizEntityJson.isProjectTypeB2 != 'true'
                "
                style="border-top: solid #dddddd; border-top-width: 1px"
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    @change="(value) => checkRadio(value)"
                    :nameList="[
                        { label: 'B类项目', name: 'isProjectTypeB1' },
                        { label: '非B类项目', name: 'isProjectTypeB2' },
                    ]"
                />
            </dl-col>

            <dl-col
                :span="24"
                title="选择"
                :novalue="
                    form.bizEntityJson.positionLevel1 != 'true' &&
                    form.bizEntityJson.positionLevel2 != 'true' &&
                    form.bizEntityJson.positionLevel3 != 'true' &&
                    form.bizEntityJson.positionLevel13 != 'true' &&
                    form.bizEntityJson.positionLevel4 != 'true' &&
                    form.bizEntityJson.positionLevel15 != 'true'
                "
                place="right"
            >
                <dl-col :span="24" style="border: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="positionLevelList1"
                    />
                </dl-col>
                <dl-col :span="24" style="border: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="positionLevelList2"
                    />
                </dl-col>
                <dl-col :span="24" style="border: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="positionLevelList3"
                    />
                </dl-col>
            </dl-col>

            <template v-if="processCode != 'SYGS_XZRL_RLZY_40'">
            <dl-col
                v-if="
                    form.bizEntityJson.changeType1 == 'true' ||
                        form.bizEntityJson.changeType2 == 'true' ||
                        form.bizEntityJson.changeType3 == 'true'
                "
                :span="24"
                title="类别"
                :novalue="
                    form.bizEntityJson.changeType1 != 'true' &&
                    form.bizEntityJson.changeType2 != 'true' &&
                    form.bizEntityJson.changeType3 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '薪资、岗位确定及调整', name: 'changeType1' },
                        { label: '仅政策内补贴申请', name: 'changeType2' },
                        { label: '上述情况之外', name: 'changeType3' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-else
                :span="24"
                title="类别"
                :novalue="
                    form.bizEntityJson.changeType4 != 'true' &&
                    form.bizEntityJson.changeType5 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '薪酬核定在六级以内', name: 'changeType4' },
                        { label: '薪酬核定在六级以外', name: 'changeType5' },
                    ]"
                />
            </dl-col>
            </template>
        </el-row>
        <el-row
            v-if="
                processCode == 'BLSY_XZRL_RLZY_10' ||
                processCode == 'SYGS_XZRL_RLZY_40'
            "
            class="padding-row"
        >
            <template
                v-if="
                    processCode != 'SYGS_XZRL_RLZY_40' &&
                    processCode != 'BLSY_XZRL_RLZY_10'
                "
            >
                <dl-col :span="24" title="调整项目" place="right">
                    <dl-col :span="24">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '新聘', name: 'adjustItem11' },
                                { label: '提前转正', name: 'adjustItem2_2' },
                                { label: '转正', name: 'adjustItem2_1' },
                                { label: '工资变动', name: 'adjustItem6' },
                            ]"
                        />
                    </dl-col>

                    <dl-col
                        :span="24"
                        style="border-left: none"
                        v-if="
                            processCode != 'XZRS_RLZY_30' &&
                            processCode != 'XZRS_RLZY_30_SH'
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '临时借调', name: 'adjustItem8' },
                                { label: '升职', name: 'adjustItem3' },
                                { label: '降职', name: 'adjustItem4' },
                                {
                                    label:
                                        processCode == 'XZRS_RLZY_30' ||
                                        processCode == 'XZRS_RLZY_30_SH'
                                            ? '内部调动(公司与公司)'
                                            : '内部调动(中心与中心)',
                                    name: 'adjustItem5',
                                },
                                {
                                    label:
                                        processCode == 'BLSY_XZRL_RLZY_10' ||
                                        processCode == 'SYGS_XZRL_RLZY_40'
                                            ? '内部调动(总部与公司)'
                                            : processCode == 'XZRS_RLZY_30' ||
                                              processCode ==
                                                  'XZRS_RLZY_30_SH' ||
                                              '内部调动(中心与公司)',
                                    name: 'adjustItem13',
                                },
                                {
                                    label:
                                        processCode == 'BLSY_XZRL_RLZY_10' ||
                                        processCode == 'SYGS_XZRL_RLZY_40' ||
                                        '内部调动(跨板块)',
                                    name: 'adjustItem14',
                                },
                            ]"
                        />
                    </dl-col>
                    <dl-col
                        :span="24"
                        style="border-left: none"
                        v-if="
                            processCode != 'XZRS_RLZY_30' &&
                            processCode != 'XZRS_RLZY_30_SH'
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '奖励', name: 'adjustItem9' },
                                { label: '惩罚', name: 'adjustItem10' },
                                { label: '兼职', name: 'adjustItem7' },
                            ]"
                        />
                    </dl-col>
                </dl-col>
            </template>

            <dl-col
                v-if="form.bizEntityJson.adjustItem11 == 'true'"
                :span="24"
                title="请选择"
                :novalue="
                    form.bizEntityJson.adjustItem21 != 'true' &&
                    form.bizEntityJson.adjustItem22 != 'true' &&
                    form.bizEntityJson.adjustItem23 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '新员工', name: 'adjustItem21' },
                        { label: '离职返岗', name: 'adjustItem22' },
                        { label: '退休返聘', name: 'adjustItem23' },
                    ]"
                />
            </dl-col>
            <dl-col
                :span="24"
                :title="processCode == 'BLSY_XZRL_RLZY_10' ? '中心' : '公司'"
                :novalue="!form.bizEntityJson.centerName"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.centerName"
                    @focus="showSearchOrg1 = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                v-if="processCode == 'BLSY_XZRL_RLZY_10'"
                :span="12"
                title="姓名"
                :novalue="!form.bizEntityJson.userName"
            >
                <el-input
                    v-model="form.bizEntityJson.userName"
                    @focus="showSearchHrUser = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                v-if="processCode == 'BLSY_XZRL_RLZY_10'"
                :span="12"
                title="部门"
                :novalue="!form.bizEntityJson.deptName"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.deptName"
                    @focus="showSearchOrg2 = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                v-if="processCode != 'BLSY_XZRL_RLZY_10'"
                :span="12"
                title="姓名"
                place="right"
                :novalue="!form.bizEntityJson.userName"
            >
                <el-input
                    v-model="form.bizEntityJson.userName"
                    @focus="showSearchHrUser = true"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                v-if="processCode != 'BLSY_XZRL_RLZY_10'"
                :span="12"
                title="部门"
                :novalue="!form.bizEntityJson.deptName"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.deptName"
                    @focus="showSearchOrg2 = true"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="性别"
                :novalue="
                    form.bizEntityJson.isMale != 'true' &&
                    form.bizEntityJson.isFemale != 'true'
                "
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '男', name: 'isMale' },
                        { label: '女', name: 'isFemale' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="年龄"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.age"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="身高"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.height"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="体重"
            >
                <el-input
                    v-model="form.bizEntityJson.weight"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="学历"
            >
                <el-input
                    v-model="form.bizEntityJson.education"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem21 == 'true' ||
                    form.bizEntityJson.adjustItem22 == 'true'
                "
                :span="8"
                title="职业证书"
                place="right"
            >
                <el-input
                    v-model="form.bizEntityJson.certificate"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col :span="8" title="职位" place="right">
                <el-input
                    v-model="form.bizEntityJson.positionName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="入职日期"
                :novalue="!form.bizEntityJson.enterDate"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.enterDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                :span="12"
                title="生效日期"
                :novalue="!form.bizEntityJson.effectDate"
                place="right"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.effectDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                    @blur="checkDate"
                />
            </dl-col>
            <dl-col
                v-if="processCode == 'SYGS_XZRL_RLZY_40'"
                :span="24"
                title="用工类别"
                :novalue="
                    form.bizEntityJson.userKind1 != 'true' &&
                    form.bizEntityJson.userKind3 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '正式工', name: 'userKind1' },
                        { label: '实习生', name: 'userKind3' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-else-if="processCode == 'BLSY_XZRL_RLZY_10'"
                :span="24"
                title="用工类别"
                :novalue="
                    form.bizEntityJson.userKind1 != 'true' &&
                    form.bizEntityJson.userKind3 != 'true'
                "
                place="right"
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '正式工', name: 'userKind1' },
                        { label: '实习生', name: 'userKind3' },
                        { label: '外派', name: 'userKind5' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-else
                :span="24"
                title="用工类别"
                place="right"
                :novalue="
                    !form.bizEntityJson.userKind1 &&
                    !form.bizEntityJson.userKind2 &&
                    !form.bizEntityJson.userKind3 &&
                    !form.bizEntityJson.userKind4 &&
                    !form.bizEntityJson.userKind5 &&
                    !form.bizEntityJson.userKind6
                "
            >
                <dl-col :span="24" style="border-left: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio4(value)"
                        :nameList="[
                            { label: '正式工', name: 'userKind1' },
                            { label: '临时工', name: 'userKind2' },
                            { label: '实习生', name: 'userKind3' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    style="border-left: none; border-bottom: none"
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio5(value)"
                        :nameList="[
                            { label: '外聘', name: 'userKind4' },
                            { label: '外派', name: 'userKind5' },
                            { label: '外籍', name: 'userKind6' },
                        ]"
                    />
                </dl-col>
            </dl-col>
            <template v-if="processCode == 'BLSY_XZRL_RLZY_10'">
                <dl-col :span="24" title="调整项目">
                    <dl-col :span="24">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '新聘', name: 'adjustItem11' },
                                { label: '提前转正', name: 'adjustItem2_2' },
                                { label: '转正', name: 'adjustItem2_1' },
                                { label: '工资变动', name: 'adjustItem6' },
                                {
                                    label: '内部调动(跨板块)',
                                    name: 'adjustItem14',
                                },
                            ]"
                        />
                    </dl-col>

                    <dl-col :span="24" style="border-left: none">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '临时借调', name: 'adjustItem8' },
                                { label: '升职', name: 'adjustItem3' },
                                { label: '降职', name: 'adjustItem4' },
                                {
                                    label:
                                        processCode == 'XZRS_RLZY_30' ||
                                        processCode == 'XZRS_RLZY_30_SH'
                                            ? '内部调动(公司与公司)'
                                            : '内部调动(平调)',
                                    name: 'adjustItem5',
                                },
                                {
                                    label:
                                        processCode == 'BLSY_XZRL_RLZY_10' ||
                                        processCode == 'SYGS_XZRL_RLZY_40'
                                            ? '内部调动(异地调动)'
                                            : processCode == 'XZRS_RLZY_30' ||
                                              processCode ==
                                                  'XZRS_RLZY_30_SH' ||
                                              '内部调动(中心与公司)',
                                    name: 'adjustItem13',
                                },
                            ]"
                        />
                    </dl-col>
                    <dl-col :span="24" style="border-left: none">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '奖励', name: 'adjustItem9' },
                                { label: '惩罚', name: 'adjustItem10' },
                                { label: '兼职', name: 'adjustItem7' },
                            ]"
                        />
                    </dl-col>
                </dl-col>
            </template>

            <template v-if="processCode == 'SYGS_XZRL_RLZY_40'">
                <dl-col :span="24" title="调整项目">
                    <dl-col :span="24">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '新聘', name: 'adjustItem11' },
                                { label: '提前转正', name: 'adjustItem2_2' },
                                { label: '转正', name: 'adjustItem2_1' },
                                { label: '工资变动', name: 'adjustItem6' },
                            ]"
                        />
                    </dl-col>
                    <dl-col
                        v-if="form.bizEntityJson.adjustItem11 == 'true'"
                        :span="24"
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '不超等级', name: 'level1' },
                                { label: '超等级', name: 'level2' },
                            ]"
                        />
                    </dl-col>

                    <dl-col :span="24" style="border-left: none">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '临时借调', name: 'adjustItem8' },
                                { label: '升职', name: 'adjustItem3' },
                                { label: '降职', name: 'adjustItem4' },
                                {
                                    label: '内部调动(公司与公司)',
                                    name: 'adjustItem5',
                                },
                                {
                                    label: '内部调动(跨板块)',
                                    name: 'adjustItem14',
                                },
                            ]"
                        />
                    </dl-col>
                    <dl-col :span="24" style="border-left: none">
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '奖励', name: 'adjustItem9' },
                                { label: '惩罚', name: 'adjustItem10' },
                                { label: '兼职', name: 'adjustItem7' },
                            ]"
                        />
                    </dl-col>
                </dl-col>
            </template>
            <template
                v-if="
                    form.bizEntityJson.adjustItem3 == 'true' ||
                    form.bizEntityJson.adjustItem6 == 'true'
                "
            >
                <dl-col
                    :span="24"
                    title="上传简历"
                    place="right"
                    :novalue="!form.bizEntityJson.resumeId"
                >
                    <one-file :form="form" value="resumeId" />
                </dl-col>
                <dl-col
                    v-if="
                        form.bizEntityJson.adjustItem6 == 'true' ||
                        form.bizEntityJson.adjustItem3 == 'true'
                    "
                    :span="24"
                    title="上次调薪"
                    place="right"
                >
                    <dl-col
                        :span="8"
                        style="border-bottom: none"
                        title="调薪时间"
                        :novalue="!form.bizEntityJson.lastSalaAdjuDate"
                    >
                        <el-date-picker
                            v-model="form.bizEntityJson.lastSalaAdjuDate"
                            value-format="yyyy-MM-dd"
                            clearable
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请选择'
                            "
                            :disabled="form.bizEntityJson.disabled"
                        />
                    </dl-col>
                    <dl-col
                        :span="8"
                        v-if="
                            processCode == 'XZRS_RLZY_30' ||
                            processCode == 'XZRS_RLZY_30_SH' ||
                            processCode == 'SYGS_XZRL_RLZY_40' ||
                            processCode == 'BLSY_XZRL_RLZY_10'
                        "
                    >
                        <d-radio-group-string
                            readonly
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '不满一年', name: 'lessThenaYear' },
                                { label: '超过一年', name: 'moreThenaYear' },
                            ]"
                        />
                    </dl-col>
                    <dl-col
                        :span="8"
                        style="border-bottom: none"
                        title="调薪幅度"
                        :novalue="!form.bizEntityJson.lastSalaAdjuRage"
                    >
                        <el-input
                            v-model="form.bizEntityJson.lastSalaAdjuRage"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                </dl-col>
                <dl-col
                    v-if="
                        processCode == 'XZRS_RLZY_30' ||
                        processCode == 'XZRS_RLZY_30_SH'
                    "
                    :span="24"
                    title="本次调薪"
                >
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="调薪等级"
                        :novalue="
                            !form.bizEntityJson.salaAdjuLevel1 &&
                            !form.bizEntityJson.salaAdjuLevel3
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '一级', name: 'salaAdjuLevel1' },
                                { label: '一级以上', name: 'salaAdjuLevel3' },
                            ]"
                        />
                    </dl-col>
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="调薪幅度"
                        :novalue="
                            !form.bizEntityJson.salaAdjuMargin1 &&
                            !form.bizEntityJson.salaAdjuMargin2
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '20%以内', name: 'salaAdjuMargin1' },
                                { label: '20%以上', name: 'salaAdjuMargin2' },
                            ]"
                        />
                    </dl-col>
                </dl-col>
                <dl-col
                    v-if="
                        processCode == 'SYGS_XZRL_RLZY_40' ||
                        processCode == 'SYGS_XZRL_RLZY_40' ||
                        processCode == 'BLSY_XZRL_RLZY_10'
                    "
                    :span="24"
                    title="本次调薪"
                >
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="调薪等级"
                        :novalue="
                            !form.bizEntityJson.salaAdjuLevel1 &&
                            !form.bizEntityJson.salaAdjuLevel3
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '一级', name: 'salaAdjuLevel1' },
                                { label: '一级以上', name: 'salaAdjuLevel3' },
                            ]"
                        />
                    </dl-col>
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="调薪幅度"
                        :novalue="
                            !form.bizEntityJson.salaAdjuMargin1 &&
                            !form.bizEntityJson.salaAdjuMargin2
                        "
                    >
                        <d-radio-group-string
                            v-model="form.bizEntityJson"
                            :nameList="[
                                { label: '15%以内', name: 'salaAdjuMargin1' },
                                { label: '15%以上', name: 'salaAdjuMargin2' },
                            ]"
                        />
                    </dl-col>
                </dl-col>
                <dl-col
                    v-if="
                        processCode == 'XZRS_RLZY_8' ||
                        processCode == 'XZRS_RLZY_8_SH'
                    "
                    :span="24"
                    title="360考核结果"
                    place="right"
                >
                    <dl-col
                        :span="4"
                        title="上级："
                        style="border-bottom: none"
                    >
                        <el-select
                            v-model="form.bizEntityJson.upSelect"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请选择'
                            "
                            :disabled="form.bizEntityJson.disabled"
                        >
                            <el-option label="优秀" value="1"></el-option>
                            <el-option label="良好" value="2"></el-option>
                            <el-option label="一般" value="3"></el-option>
                            <el-option label="较差" value="4"></el-option>
                        </el-select>
                    </dl-col>
                    <dl-col
                        :span="4"
                        title="下级："
                        style="border-bottom: none"
                    >
                        <el-select
                            v-model="form.bizEntityJson.downSelect"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请选择'
                            "
                            :disabled="form.bizEntityJson.disabled"
                        >
                            <el-option label="优秀" value="1"></el-option>
                            <el-option label="良好" value="2"></el-option>
                            <el-option label="一般" value="3"></el-option>
                            <el-option label="较差" value="4"></el-option>
                        </el-select>
                    </dl-col>
                    <dl-col
                        :span="4"
                        title="同事："
                        style="border-bottom: none"
                    >
                        <el-select
                            v-model="form.bizEntityJson.mateSelect"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请选择'
                            "
                            :disabled="form.bizEntityJson.disabled"
                        >
                            <el-option label="优秀" value="1"></el-option>
                            <el-option label="良好" value="2"></el-option>
                            <el-option label="一般" value="3"></el-option>
                            <el-option label="较差" value="4"></el-option>
                        </el-select>
                    </dl-col>
                    <dl-col
                        :span="4"
                        title="客户："
                        style="border-bottom: none"
                    >
                        <el-select
                            v-model="form.bizEntityJson.custSelect"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请选择'
                            "
                            :disabled="form.bizEntityJson.disabled"
                        >
                            <el-option label="优秀" value="1"></el-option>
                            <el-option label="良好" value="2"></el-option>
                            <el-option label="一般" value="3"></el-option>
                            <el-option label="较差" value="4"></el-option>
                        </el-select>
                    </dl-col>
                    <dl-col
                        :span="4"
                        style="border-bottom: none"
                        title="素质测评结果"
                        :novalue="!form.bizEntityJson.qualityTest"
                    >
                        <el-input
                            v-model="form.bizEntityJson.qualityTest"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                    <dl-col
                        :span="4"
                        style="border-bottom: none"
                        title="人资中心面谈"
                        :novalue="!form.bizEntityJson.hrTalk"
                    >
                        <el-input
                            v-model="form.bizEntityJson.hrTalk"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                </dl-col>
                <dl-col
                    v-if="
                        processCode != 'JD_XZRS_45' &&
                        processCode != 'BLPM_XZRS_10'
                    "
                    :span="24"
                    title="绩效考核"
                    place="right"
                >
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="上季度成绩"
                        :novalue="!form.bizEntityJson.last1QuarScore"
                    >
                        <el-input
                            v-model="form.bizEntityJson.last1QuarScore"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                    <dl-col
                        :span="12"
                        style="border-bottom: none"
                        title="上上季度成绩"
                        :novalue="!form.bizEntityJson.last2QuarScore"
                    >
                        <el-input
                            v-model="form.bizEntityJson.last2QuarScore"
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                </dl-col>
            </template>
            <dl-col :span="24" title="调整内容" place="right">
                <dl-col
                    :span="12"
                    place="title"
                    style="border-left: none; border-bottom: none"
                >
                    <h2>调整前</h2>
                </dl-col>
                <dl-col :span="12" place="title" style="border-bottom: none">
                    <h2>调整后</h2>
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="中心/公司" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.centerCdBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.centerCdBefore"
                        @focus="showSearchOrgBefore = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.centerCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.centerCdAfter"
                        @focus="showSearchOrgAfter = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="部门" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.deptCdBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.deptCdBefore"
                        @focus="showSearchDepBefore = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.deptCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.deptCdAfter"
                        @focus="showSearchDepAfter = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="职位" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionCdBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionCdBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionCdAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="职级" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-select
                        v-model="form.bizEntityJson.levelCdBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="330" value="CP1"></el-option>
                        <el-option label="320" value="CP2"></el-option>
                        <el-option label="310" value="CP3"></el-option>
                        <el-option label="300" value="CP4"></el-option>
                        <el-option label="290" value="CP5"></el-option>
                        <el-option label="280" value="CP6"></el-option>
                        <el-option label="270" value="CP7"></el-option>
                        <el-option label="260" value="CP8"></el-option>
                        <el-option label="250" value="CP9"></el-option>
                        <el-option label="240" value="CP10"></el-option>
                        <el-option label="230" value="CP11"></el-option>
                        <el-option label="220" value="CP12"></el-option>
                        <el-option label="3300" value="CM1"></el-option>
                        <el-option label="3200" value="CM2"></el-option>
                        <el-option label="3100" value="CM3"></el-option>
                        <el-option label="3000" value="CM4"></el-option>
                        <el-option label="2900" value="CM5"></el-option>
                        <el-option label="2800" value="CM6"></el-option>
                        <el-option label="2700" value="CM7"></el-option>
                        <el-option label="2600" value="CM8"></el-option>
                        <el-option label="2500" value="CM9"></el-option>
                        <el-option label="2400" value="CM10"></el-option>
                        <el-option label="2300" value="CM11"></el-option>
                        <el-option label="2200" value="CM12"></el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.levelCdAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="330" value="CP1"></el-option>
                        <el-option label="320" value="CP2"></el-option>
                        <el-option label="310" value="CP3"></el-option>
                        <el-option label="300" value="CP4"></el-option>
                        <el-option label="290" value="CP5"></el-option>
                        <el-option label="280" value="CP6"></el-option>
                        <el-option label="270" value="CP7"></el-option>
                        <el-option label="260" value="CP8"></el-option>
                        <el-option label="250" value="CP9"></el-option>
                        <el-option label="240" value="CP10"></el-option>
                        <el-option label="230" value="CP11"></el-option>
                        <el-option label="220" value="CP12"></el-option>
                        <el-option label="3300" value="CM1"></el-option>
                        <el-option label="3200" value="CM2"></el-option>
                        <el-option label="3100" value="CM3"></el-option>
                        <el-option label="3000" value="CM4"></el-option>
                        <el-option label="2900" value="CM5"></el-option>
                        <el-option label="2800" value="CM6"></el-option>
                        <el-option label="2700" value="CM7"></el-option>
                        <el-option label="2600" value="CM8"></el-option>
                        <el-option label="2500" value="CM9"></el-option>
                        <el-option label="2400" value="CM10"></el-option>
                        <el-option label="2300" value="CM11"></el-option>
                        <el-option label="2200" value="CM12"></el-option>
                    </el-select>
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'SYGS_XZRL_RLZY_40' ||
                    processCode == 'BLSY_XZRL_RLZY_10'
                "
                :span="24"
                title="职务"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionNameBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionNameBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionNameAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionNameAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="工资" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.salaryBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.salaryBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.salaryAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.salaryAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="processCode != 'SYGS_XZRL_RLZY_40'"
                :span="24"
                title="津贴(元)"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.subsidiesBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.subsidiesBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.subsidiesAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.subsidiesAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="processCode != 'SYGS_XZRL_RLZY_40'"
                :span="24"
                title="外派补贴(元)"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.foreSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.foreSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.foreSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.foreSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="住房补贴(元)" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.houseSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.houseSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="交通补贴(元)" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.trafficSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.trafficSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="通讯补贴(元)" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.commuSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.commuSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="特殊补贴(元)" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.specialSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.specialSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.specialSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.specialSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="其他" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.otherBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.otherBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.otherAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.otherAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="备注" place="right">
                <el-input
                    v-model="form.bizEntityJson.remark"
                    type="textarea"
                    :autosize="{ minRows: 5 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
        </el-row>
        <el-row v-else>
            <dl-col
                :span="24"
                title="中心"
                place="right"
                :novalue="!form.bizEntityJson.centerName"
            >
                <el-input
                    v-model="form.bizEntityJson.centerName"
                    @focus="showSearchOrg = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                :span="8"
                title="姓名"
                place="right"
                :novalue="!form.bizEntityJson.userName"
            >
                <el-input
                    v-model="form.bizEntityJson.userName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="16"
                title="部门"
                :novalue="!form.bizEntityJson.userName"
            >
                <el-input
                    v-model="form.bizEntityJson.deptName"
                    @focus="showSearchOrg2 = true"
                    readonly
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                />
            </dl-col>
            <dl-col
                :span="8"
                title="职位"
                :novalue="!form.bizEntityJson.positionName"
            >
                <el-input
                    v-model="form.bizEntityJson.positionName"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
            <dl-col
                :span="8"
                title="入职日期"
                :novalue="!form.bizEntityJson.enterDate"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.enterDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                :span="8"
                title="生效日期"
                :novalue="!form.bizEntityJson.effectDate"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.effectDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_30' ||
                    processCode == 'XZRS_RLZYSY_30' ||
                    processCode == 'XZRS_RLZY_8' ||
                    processCode == 'XZRS_RLZY_80' ||
                    processCode == 'XZRS_RLZY_3100'
                "
                :span="24"
                title="用工类别"
                place="right"
                :novalue="
                    !form.bizEntityJson.userKind1 &&
                    !form.bizEntityJson.userKind2 &&
                    !form.bizEntityJson.userKind3
                "
            >
                <d-radio-group-string
                    v-model="form.bizEntityJson"
                    :nameList="[
                        { label: '正式工', name: 'userKind1' },
                        { label: '临时工', name: 'userKind2' },
                        { label: '实习生', name: 'userKind3' },
                    ]"
                />
            </dl-col>
            <dl-col
                v-else
                :span="24"
                title="用工类别"
                place="right"
                :novalue="
                    !form.bizEntityJson.userKind1 &&
                    !form.bizEntityJson.userKind2 &&
                    !form.bizEntityJson.userKind3 &&
                    !form.bizEntityJson.userKind4 &&
                    !form.bizEntityJson.userKind5 &&
                    !form.bizEntityJson.userKind6
                "
            >
                <dl-col :span="24" style="border-left: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio4(value)"
                        :nameList="[
                            { label: '正式工', name: 'userKind1' },
                            { label: '临时工', name: 'userKind2' },
                            { label: '实习生', name: 'userKind3' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    style="border-left: none; border-bottom: none"
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio5(value)"
                        :nameList="[
                            { label: '外聘', name: 'userKind4' },
                            { label: '外派', name: 'userKind5' },
                            { label: '外籍', name: 'userKind6' },
                        ]"
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="调整项目" place="right" id="table_chk">
                <dl-col :span="24" style="border-left: none">
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio1(value)"
                        :nameList="[
                            { label: '新聘', name: 'adjustItem11' },
                            { label: '提前转正', name: 'adjustItem2_2' },
                            { label: '转正', name: 'adjustItem2_1' },
                            { label: '工资变动', name: 'adjustItem6' },
                        ]"
                    />
                    <div
                        class="explain-p"
                        v-if="
                            processCode == 'XZRS_RLZY_30' ||
                            processCode == 'XZRS_RLZYSY_30' ||
                            processCode == 'XZRS_RLZY_8' ||
                            processCode == 'XZRS_RLZY_80'
                        "
                    >
                        <p class="explain-p-one">
                            (仅适用于①跨城市调动 ②职位变动)
                        </p>
                    </div>
                </dl-col>
                <dl-col
                    :span="24"
                    style="border-left: none"
                    v-if="
                        processCode != 'XZRS_RLZY_30' &&
                        processCode != 'XZRS_RLZY_30_SH'
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio2(value)"
                        :nameList="[
                            { label: '临时借调', name: 'adjustItem8' },
                            { label: '升职', name: 'adjustItem3' },
                            { label: '降职', name: 'adjustItem4' },
                            {
                                label:
                                    processCode == 'XZRS_RLZY_30' ||
                                    processCode == 'XZRS_RLZY_30_SH'
                                        ? '内部调动(公司与公司)'
                                        : processCode == 'XZRS_RLZY_8' ||
                                          processCode == 'XZRS_RLZY_80'
                                        ? '内部调动(平调)'
                                        : '内部调动(中心与中心)',
                                name: 'adjustItem5',
                            },
                            {
                                label:
                                    processCode == 'BLSY_XZRL_RLZY_10' ||
                                    processCode == 'SYGS_XZRL_RLZY_40'
                                        ? '内部调动(总部与公司)'
                                        : processCode == 'XZRS_RLZY_8' ||
                                          processCode == 'XZRS_RLZY_80'
                                        ? '内部调动(异地调动)'
                                        : '内部调动(中心与公司)',
                                name: 'adjustItem13',
                            },
                        ]"
                    />
                </dl-col>
                <dl-col :span="24" style="border-left: none" v-else>
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio2(value)"
                        :nameList="[
                            { label: '临时借调', name: 'adjustItem8' },
                            { label: '升职', name: 'adjustItem3' },
                            { label: '降职', name: 'adjustItem4' },
                            {
                                label:
                                    processCode == 'XZRS_RLZY_30' ||
                                    processCode == 'XZRS_RLZY_30_SH'
                                        ? '内部调动(公司与公司)'
                                        : processCode == 'XZRS_RLZY_8' ||
                                          processCode == 'XZRS_RLZY_80'
                                        ? '内部调动(平调)'
                                        : '内部调动(中心与中心)',
                                name: 'adjustItem5',
                            },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="24"
                    style="border-left: none; border-bottom: none"
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        @change="(value) => checkRadio3(value)"
                        :nameList="[
                            { label: '奖励', name: 'adjustItem9' },
                            { label: '惩罚', name: 'adjustItem10' },
                            { label: '退休返聘', name: 'adjustItem23' },
                            {
                                label:
                                    (processCode != 'XZRS_RLZY_30' &&
                                        processCode != 'XZRS_RLZYSY_30' &&
                                        processCode != 'XZRS_RLZY_8') ||
                                    processCode != 'XZRS_RLZY_80'
                                        ? '其他'
                                        : '兼职',
                                name: 'adjustItem7',
                            },
                        ]"
                    />
                    <dl-col
                        :span="6"
                        style="border-bottom: none"
                        v-if="
                            (processCode != 'XZRS_RLZY_30' &&
                                processCode != 'XZRS_RLZYSY_30' &&
                                processCode != 'XZRS_RLZY_8') ||
                            processCode != 'XZRS_RLZY_80'
                        "
                    >
                        <el-input
                            v-model="form.bizEntityJson.adjustOther"
                            :disabled="
                                form.bizEntityJson.adjustItem7 == 'false'
                            "
                            :placeholder="
                                form.bizEntityJson.disabled ? '' : '请输入'
                            "
                        />
                    </dl-col>
                </dl-col>
            </dl-col>
            <dl-col
                v-if="form.bizEntityJson.adjustItem23 == 'true'"
                style="border-bottom: none"
                :span="8"
                title="退休日期"
                :novalue="!form.bizEntityJson.tireDate"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.tireDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                v-if="form.bizEntityJson.adjustItem23 == 'true'"
                style="border-bottom: none"
                :span="8"
                title="最后工作日期"
                :novalue="!form.bizEntityJson.lastDate"
                place="right"
            >
                <el-date-picker
                    v-model="form.bizEntityJson.lastDate"
                    value-format="yyyy-MM-dd"
                    clearable
                    :placeholder="form.bizEntityJson.disabled ? '' : '请选择'"
                    :disabled="form.bizEntityJson.disabled"
                />
            </dl-col>
            <dl-col
                v-if="form.bizEntityJson.adjustItem8 == 'true'"
                :span="24"
                title="调回日期"
                id="table_abc"
            >
                <dl-col
                    :span="12"
                    title=""
                    style="border-left: none; border-bottom: none"
                    :novalue="!form.bizEntityJson.backTime"
                    place="right"
                >
                    <el-date-picker
                        v-model="form.bizEntityJson.backTime"
                        value-format="yyyy-MM-dd"
                        clearable
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem6 == 'true' ||
                    form.bizEntityJson.adjustItem3 == 'true'
                "
                :span="24"
                title="上传简历"
                place="right"
                :novalue="!form.bizEntityJson.resumeId"
            >
                <one-file :form="form" value="resumeId" />
            </dl-col>
            <dl-col
                v-if="
                    form.bizEntityJson.adjustItem6 == 'true' ||
                    form.bizEntityJson.adjustItem3 == 'true'
                "
                :span="24"
                title="上次调薪"
                place="right"
            >
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="调薪时间"
                    :novalue="!form.bizEntityJson.lastSalaAdjuDate"
                >
                    <el-date-picker
                        v-model="form.bizEntityJson.lastSalaAdjuDate"
                        value-format="yyyy-MM-dd"
                        clearable
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="调薪幅度"
                    :novalue="!form.bizEntityJson.lastSalaAdjuRage"
                >
                    <el-input
                        v-model="form.bizEntityJson.lastSalaAdjuRage"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_30' ||
                    processCode == 'XZRS_RLZY_30_SH' ||
                    processCode == 'XZRS_RLZYSY_30'
                "
                :span="24"
                title="本次调薪"
            >
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="调薪等级"
                    :novalue="
                        !form.bizEntityJson.salaAdjuLevel1 &&
                        !form.bizEntityJson.salaAdjuLevel3
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                            { label: '一级', name: 'salaAdjuLevel1' },
                            { label: '一级以上', name: 'salaAdjuLevel3' },
                        ]"
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="调薪幅度"
                    :novalue="
                        !form.bizEntityJson.salaAdjuMargin1 &&
                        !form.bizEntityJson.salaAdjuMargin2
                    "
                >
                    <d-radio-group-string
                        v-model="form.bizEntityJson"
                        :nameList="[
                            { label: '15%以内', name: 'salaAdjuMargin1' },
                            { label: '15%以上', name: 'salaAdjuMargin2' },
                        ]"
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_80' ||
                    processCode == 'XZRS_RLZY_8_SH'
                "
                :span="24"
                title="360考核结果"
                place="right"
            >
                <dl-col :span="4" title="上级：" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.upSelect"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="优秀" value="1"></el-option>
                        <el-option label="良好" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="较差" value="4"></el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="4" title="下级：" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.downSelect"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="优秀" value="1"></el-option>
                        <el-option label="良好" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="较差" value="4"></el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="4" title="同事：" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.mateSelect"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="优秀" value="1"></el-option>
                        <el-option label="良好" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="较差" value="4"></el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="4" title="客户：" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.custSelect"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option label="优秀" value="1"></el-option>
                        <el-option label="良好" value="2"></el-option>
                        <el-option label="一般" value="3"></el-option>
                        <el-option label="较差" value="4"></el-option>
                    </el-select>
                </dl-col>
                <dl-col
                    :span="4"
                    style="border-bottom: none"
                    title="素质测评结果"
                    :novalue="!form.bizEntityJson.qualityTest"
                >
                    <el-input
                        v-model="form.bizEntityJson.qualityTest"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="4"
                    style="border-bottom: none"
                    title="人资中心面谈"
                    :novalue="!form.bizEntityJson.hrTalk"
                >
                    <el-input
                        v-model="form.bizEntityJson.hrTalk"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode != 'JD_XZRS_45' &&
                    processCode != 'BLPM_XZRS_10' &&
                    (form.bizEntityJson.adjustItem6 == 'true' ||
                        form.bizEntityJson.adjustItem3 == 'true')
                "
                :span="24"
                title="绩效考核"
                place="right"
            >
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="上季度成绩"
                    :novalue="!form.bizEntityJson.last1QuarScore"
                >
                    <el-input
                        v-model="form.bizEntityJson.last1QuarScore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    style="border-bottom: none"
                    title="上上季度成绩"
                    :novalue="!form.bizEntityJson.last2QuarScore"
                >
                    <el-input
                        v-model="form.bizEntityJson.last2QuarScore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="调整内容" place="right">
                <dl-col
                    :span="12"
                    place="title"
                    style="border-left: none; border-bottom: none"
                >
                    <h2>调整前</h2>
                </dl-col>
                <dl-col :span="12" place="title" style="border-bottom: none">
                    <h2>调整后</h2>
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="中心/公司" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.centerCdBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.centerCdBefore"
                        @focus="showSearchOrgBefore = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.centerCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.centerCdAfter"
                        @focus="showSearchOrgAfter = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="部门" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.deptCdBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.deptCdBefore"
                        @focus="showSearchDepBefore = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.deptCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.deptCdAfter"
                        @focus="showSearchDepAfter = true"
                        readonly
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="职位" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionCdAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionCdAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="职级" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-select
                        v-model="form.bizEntityJson.levelBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option
                            v-for="item in currencyAmtOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-select
                        v-model="form.bizEntityJson.levelAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请选择'
                        "
                        :disabled="form.bizEntityJson.disabled"
                    >
                        <el-option
                            v-for="item in currencyAmtOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="职务" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionNameBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionNameBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.positionNameAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.positionNameAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="工资" place="right">
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.salaryBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.salaryBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.salaryAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.salaryAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="外派补贴(元)" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.foreSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.foreSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_8' ||
                    processCode == 'XZRS_RLZY_80' ||
                    processCode == 'XZRS_RLZY_30' ||
                    processCode == 'XZRS_RLZYSY_30'
                "
                :span="24"
                title="住房补贴(元)"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.houseSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.houseSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col v-else :span="24" title="住房补贴(元)" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.houseSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_8' ||
                    processCode == 'XZRS_RLZY_80' ||
                    processCode == 'XZRS_RLZY_30' ||
                    processCode == 'XZRS_RLZYSY_30'
                "
                :span="24"
                title="交通补贴(元)"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.trafficSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.trafficSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col v-else :span="24" title="交通补贴(元)" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.trafficSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col
                v-if="
                    processCode == 'XZRS_RLZY_8' ||
                    processCode == 'XZRS_RLZY_80' ||
                    processCode == 'XZRS_RLZY_30' ||
                    processCode == 'XZRS_RLZYSY_30'
                "
                :span="24"
                title="通讯补贴(元)"
                place="right"
            >
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.commuSubsidyBefore"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col
                    :span="12"
                    :novalue="!form.bizEntityJson.commuSubsidyAfter"
                    style="border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col v-else :span="24" title="通讯补贴(元)" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.commuSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="兼职补贴(元)" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.specialSubsidyBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.specialSubsidyAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="其他" place="right">
                <dl-col
                    :span="12"
                    style="border-left: none; border-bottom: none"
                >
                    <el-input
                        v-model="form.bizEntityJson.otherBefore"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
                <dl-col :span="12" style="border-bottom: none">
                    <el-input
                        v-model="form.bizEntityJson.otherAfter"
                        :placeholder="
                            form.bizEntityJson.disabled ? '' : '请输入'
                        "
                    />
                </dl-col>
            </dl-col>
            <dl-col :span="24" title="备注" place="right">
                <el-input
                    v-model="form.bizEntityJson.remark"
                    type="textarea"
                    :autosize="{ minRows: 5 }"
                    :placeholder="form.bizEntityJson.disabled ? '' : '请输入'"
                />
            </dl-col>
        </el-row>
        <search-org
            :open="showSearchOrg && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendOrgCd"
            @close="closeSearhOrg"
        />
        <search-org
            :open="showSearchOrgBefore && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendOrgCdBefore"
            @close="closeSearhOrgBefore"
        />
        <search-org
            :open="showSearchOrgAfter && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendOrgCdAfter"
            @close="closeSearhOrgAfter"
        />
        <search-org
            :open="showSearchDepBefore && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendDepCdBefore"
            @close="closeSearhDepBefore"
        />
        <search-org
            :open="showSearchDepAfter && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendDepCdAfter"
            @close="closeSearhDepAfter"
        />
        <search-user
            :open="showSearchUser && !form.bizEntityJson.disabled"
            @close="closeSearhUser"
        />
        <search-user
            :open="showSearchHrUser && !form.bizEntityJson.disabled"
            @close="closeSearchHrUser"
        />
        <search-org
            :open="showSearchOrg1 && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendDepCdAfter"
            @close="closeSearchOrg1"
        />
        <search-org
            :open="showSearchOrg2 && !form.bizEntityJson.disabled"
            :checkedVal="form.bizEntityJson.sendDepCdAfter"
            @close="closeSearchOrg2"
        />
    </div>
</template>

<script>
import template from '../components/template.vue';
export default {
    components: { template },
    data() {
        return {
            form: {}, // 本地form声明，不需要复制到模板内容配置
            // form: data, // 线上form声明，需要复制到模板内容配置
            positionLevelList1: [],
            positionLevelList2: [],
            positionLevelList3: [],
            processCode: null,
            userInfo: {},
            showSearchOrg: false, // 中心、部门组件打开关闭状态
            showSearchUser: false, // 人员组件打开关闭状态
            showSearchOrgBefore: false, // 中心组件打开关闭状态(调整前)
            showSearchOrgAfter: false, // 中心组件打开关闭状态(调整后)
            showSearchDepBefore: false, // 部门组件打开关闭状态(调整前)
            showSearchDepAfter: false, // 部门组件打开关闭状态(调整后)
            currencyAmtOptions: [],
            showSearchHrUser: false,
            showSearchOrg1: false,
            showSearchOrg2: false,
            levelList: []
        };
    },
    /* 本地模板编译需要的数据回传，不需要上传到后台 start */
    props: ["data"],
    watch: {
        data: {
            immediate: true,
            handler: function (val) {
                this.form = val;
            },
        },
    },
    /* end */
    created() {
        this.processCode = this.$store.state.menuTreeItem.processCode;
        this.userInfo = JSON.parse(localStorage.getItem("ys_contract_token"));
        this.positionLevelList1 = [
            { label: "总经理", name: "positionLevel1" },
            { label: "副总经理", name: "positionLevel2" },
        ];
        this.positionLevelList2 = [
            { label: "专业总监", name: "positionLevel3" },
            { label: "部门负责人（双线）", name: "positionLevel13" },
        ];
        this.positionLevelList3 = [
            { label: "部门负责人（非双线）", name: "positionLevel5" },
            { label: "其他人员 （双线）", name: "positionLevel4" },
            { label: "其他人员（非双线）", name: "positionLevel15" },
        ];
        if (!this.$route.query.id) {
            // 中心名称和cd
            this.$set(
                this.form.bizEntityJson,
                "centerName",
                this.userInfo.centerOrgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendOrgCd",
                this.userInfo.centerOrgCd
            );
            this.$set(
                this.form.bizEntityJson,
                "centerCdBefore",
                this.userInfo.centerOrgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendOrgCdBefore",
                this.userInfo.centerOrgCd
            );
            this.$set(
                this.form.bizEntityJson,
                "centerCdAfter",
                this.userInfo.centerOrgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendOrgCdAfter",
                this.userInfo.centerOrgCd
            );
            // 部门名称
            this.$set(
                this.form.bizEntityJson,
                "deptCdBefore",
                this.userInfo.orgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendDepCdBefore",
                this.userInfo.orgCd
            );
            this.$set(
                this.form.bizEntityJson,
                "deptCdAfter",
                this.userInfo.orgName
            );
            this.$set(
                this.form.bizEntityJson,
                "sendDepCdAfter",
                this.userInfo.orgCd
            );
            // 人员名称和cd
            this.$set(
                this.form.bizEntityJson,
                "userName",
                this.userInfo.username
            );
            this.$set(
                this.form.bizEntityJson,
                "applyUser",
                this.userInfo.userid
            );
            this.remoteMethod(this.bizEntityJson.levelCdBefore);
        }
    },
    methods: {
        // searchPositionLeft() {
        //     const param = {
        //         value: this.form.bizEntityJson.positionBefore
        //     }
        //     this.form.bizEntityJson.deptCdBefore
        // },
        // 调整项目单选按钮切换事件
        checkRadio1(value) {
            if (
                (value.name == "adjustItem11" && value.value == "true") ||
                (value.name == "adjustItem2_2" && value.value == "true") ||
                (value.name == "adjustItem2_1" && value.value == "true") ||
                (value.name == "adjustItem6" && value.value == "true")
            ) {
                this.$set(this.form.bizEntityJson, "adjustItem8", "false");
                this.$set(this.form.bizEntityJson, "adjustItem3", "false");
                this.$set(this.form.bizEntityJson, "adjustItem4", "false");
                this.$set(this.form.bizEntityJson, "adjustItem5", "false");
                this.$set(this.form.bizEntityJson, "adjustItem13", "false");
                this.$set(this.form.bizEntityJson, "adjustItem9", "false");
                this.$set(this.form.bizEntityJson, "adjustItem10", "false");
                this.$set(this.form.bizEntityJson, "adjustItem23", "false");
                this.$set(this.form.bizEntityJson, "adjustItem7", "false");
            }
        },
        checkRadio2(value) {
            if (
                (value.name == "adjustItem8" && value.value == "true") ||
                (value.name == "adjustItem3" && value.value == "true") ||
                (value.name == "adjustItem4" && value.value == "true") ||
                (value.name == "adjustItem5" && value.value == "true") ||
                (value.name == "adjustItem13" && value.value == "true")
            ) {
                this.$set(this.form.bizEntityJson, "adjustItem11", "false");
                this.$set(this.form.bizEntityJson, "adjustItem2_2", "false");
                this.$set(this.form.bizEntityJson, "adjustItem2_1", "false");
                this.$set(this.form.bizEntityJson, "adjustItem6", "false");
                this.$set(this.form.bizEntityJson, "adjustItem9", "false");
                this.$set(this.form.bizEntityJson, "adjustItem10", "false");
                this.$set(this.form.bizEntityJson, "adjustItem23", "false");
                this.$set(this.form.bizEntityJson, "adjustItem7", "false");
            }
        },
        checkRadio3(value) {
            if (
                (value.name == "adjustItem9" && value.value == "true") ||
                (value.name == "adjustItem10" && value.value == "true") ||
                (value.name == "adjustItem23" && value.value == "true") ||
                (value.name == "adjustItem7" && value.value == "true")
            ) {
                this.$set(this.form.bizEntityJson, "adjustItem11", "false");
                this.$set(this.form.bizEntityJson, "adjustItem2_2", "false");
                this.$set(this.form.bizEntityJson, "adjustItem2_1", "false");
                this.$set(this.form.bizEntityJson, "adjustItem6", "false");
                this.$set(this.form.bizEntityJson, "adjustItem8", "false");
                this.$set(this.form.bizEntityJson, "adjustItem3", "false");
                this.$set(this.form.bizEntityJson, "adjustItem4", "false");
                this.$set(this.form.bizEntityJson, "adjustItem5", "false");
                this.$set(this.form.bizEntityJson, "adjustItem13", "false");
            }
        },
        checkRadio4(value) {
            if (
                (value.name == "userKind1" && value.value == "true") ||
                (value.name == "userKind2" && value.value == "true") ||
                (value.name == "userKind3" && value.value == "true")
            ) {
                this.$set(this.form.bizEntityJson, "userKind4", "false");
                this.$set(this.form.bizEntityJson, "userKind5", "false");
                this.$set(this.form.bizEntityJson, "userKind6", "false");
            }
        },
        checkRadio5(value) {
            if (
                (value.name == "userKind4" && value.value == "true") ||
                (value.name == "userKind5" && value.value == "true") ||
                (value.name == "userKind6" && value.value == "true")
            ) {
                this.$set(this.form.bizEntityJson, "userKind1", "false");
                this.$set(this.form.bizEntityJson, "userKind2", "false");
                this.$set(this.form.bizEntityJson, "userKind3", "false");
            }
        },
        remoteMethod(query) {
            if (query) {
                this.$approval.quickSearchBizRank(query).then((response) => {
                    if (response.code == 1 && response.data) {
                        this.currencyAmtOptions = response.data;
                    } else {
                        this.currencyAmtOptions = [];
                    }
                });
            } else {
                this.$approval.quickSearchBizRank().then((response) => {
                    if (response.code == 1 && response.data) {
                        this.currencyAmtOptions = response.data;
                    } else {
                        this.currencyAmtOptions = [];
                    }
                });
            }
        },
        // 关闭中心组建回调
        closeSearchOrg2(val) {
            if (val) {
                this.form.bizEntityJson.deptName = val.text;
                this.form.bizEntityJson.deptCd = val.id;
            }
            this.showSearchOrg1 = false;
        },
        // 关闭中心组建回调
        closeSearchOrg1(val) {
            if (val) {
                this.form.bizEntityJson.centerName = val.text;
                this.form.bizEntityJson.centerCd = val.id;
            }
            this.showSearchOrg1 = false;
        },
        // 关闭中心组建回调
        closeSearhOrg(val) {
            if (val) {
                this.form.bizEntityJson.centerName = val.text;
                this.form.bizEntityJson.sendOrgCd = val.id;
            }
            this.showSearchOrg = false;
        },
        // 关闭中心组建回调(调整前)
        closeSearhOrgBefore(val) {
            if (val) {
                this.form.bizEntityJson.centerCdBefore = val.text;
                this.form.bizEntityJson.sendOrgCdBefore = val.id;
            }
            this.showSearchOrgBefore = false;
        },
        // 关闭中心组建回调(调整后)
        closeSearhOrgAfter(val) {
            if (val) {
                this.form.bizEntityJson.centerCdAfter = val.text;
                this.form.bizEntityJson.sendOrgCdAfter = val.id;
            }
            this.showSearchOrgAfter = false;
        },
        // 关闭部门组建回调(调整前)
        closeSearhDepBefore(val) {
            if (val) {
                this.form.bizEntityJson.deptCdBefore = val.text;
                this.form.bizEntityJson.sendDepCdBefore = val.id;
            }
            this.showSearchDepBefore = false;
        },
        // 关闭部门组建回调(调整后)
        closeSearhDepAfter(val) {
            if (val) {
                this.form.bizEntityJson.deptCdAfter = val.text;
                this.form.bizEntityJson.sendDepCdAfter = val.id;
            }
            this.showSearchDepAfter = false;
        },
        // 关闭人员组件回调
        closeSearhUser(val) {
            if (val) {
                this.form.bizEntityJson.userName = val.userName;
                this.form.bizEntityJson.userCd = val.userCd;
            }
            this.showSearchUser = false;
        },
        // 关闭人员组件回调
        closeSearchHrUser(val) {
            if (val) {
                this.form.bizEntityJson.userName = val.userName;
                this.form.bizEntityJson.hrResumeId = val.userCd;
            }
            this.showSearchHrUser = false;
        },
        checkDate() {
            var st1 = this.form.bizEntityJson.effectDate;
            var st2 = this.form.bizEntityJson.lastSalaAdjuDate;
            if (st1 == "" || st2 == "") {
                return;
            }
            var time1 = new Date(Date.parse(st1.replace(/-/g, "/")));
            var time2 = new Date(Date.parse(st2.replace(/-/g, "/")));
            var days = (time1.getTime() - time2.getTime()) / 86400000;
            if (days < 365) {
                this.form.bizEntityJson.lessThenaYear = "true";
                this.form.bizEntityJson.moreThenaYear = "false";
            } else {
                this.form.bizEntityJson.lessThenaYear = "false";
                this.form.bizEntityJson.moreThenaYear = "true";
            }
        },
        checkRadio(value) {
            if (value.name == "isProjectTypeB1" && value.value == "true") {
                this.positionLevelList1 = [
                    { label: "总经理", name: "positionLevel1" },
                ];
                this.positionLevelList2 = [
                    { label: "部门负责人（双线）", name: "positionLevel13" },
                ];
            } else {
                this.positionLevelList1 = [
                    { label: "总经理", name: "positionLevel1" },
                    { label: "副总经理", name: "positionLevel2" },
                ];
                this.positionLevelList2 = [
                    { label: "专业总监", name: "positionLevel3" },
                    { label: "部门负责人（双线）", name: "positionLevel13" },
                ];
            }
        },
    },
};
</script>