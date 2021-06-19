<template>
    <div class="Tab xs12">
        <h2 class="text-center t-blue-grey--1">System Settings</h2>

        <article class="flex a-i-center j-c-between wrap px-4 mt-4">
            <section class="flex">
                <select name="action" class="mr-2">
                    <option value="-1">Bulk Actions</option>
                    <option value="edit">Edit</option>
                </select>
                <button class="btn bg-cyan--4 shadow-0">Apply</button>
            </section>

            <section class="flex a-i-center">
                <select name="filter" class="mr-1">
                    <option value="-1">All Items</option>
                    <option value="mine">Mine Only</option>
                    <option value="mine">Published</option>
                    <option value="mine">drafts</option>
                </select>
                <select name="filter" class="mr-1">
                    <option value="-1">All Categories</option>
                    <option value="edit">Others</option>
                </select>
                <button class="btn bg-cyan--4 shadow-0">Filter</button>
            </section>

            <section class="px-4 py-2">5 items</section>
        </article>

        <article class="TContaner ">
            <table>
                <thead>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <th scope="col" width="50%">Head Of Table</th>
                        <th scope="col">Head Of Table</th>
                        <th scope="col">Head Of Table</th>
                        <th scope="col">Head Of Table</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <td>
                            Hairdresser Hairdresser Hairdresser Hairdresser
                            Hairdresser Hairdresser
                        </td>
                        <td>12/09</td>
                        <td>Great idea</td>
                        <td>30</td>
                    </tr>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <td>Restaurant</td>
                        <td>12/09</td>
                        <td>Regrets</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <td>Shoeshop</td>
                        <td>13/09</td>
                        <td>Big regrets</td>
                        <td>65</td>
                    </tr>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <td>Supermarket</td>
                        <td>13/09</td>
                        <td>Good</td>
                        <td>5</td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td colspan="3">SUM</td>
                        <td>118</td>
                    </tr>
                </tfoot>
            </table>
        </article>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { $Admin, $Auth } from '@/store'
import { $Confirm } from '@/plugins'

export default defineComponent({

    data () {
        return {
            allowReg: null as boolean
        }
    },

    computed: {
        isSAdmin: (): boolean => $Auth.isSAdmin,
        settings: () => $Auth.sysSettings
    },

    methods: {
        saveChanges () {
            let _this = this
            if (this.isSAdmin)
                $Confirm({
                    header: 'Save Settings',
                    message: `<b>Confirm?</b>`,
                    type: 'info',
                    onConfirm: function () {
                        return $Admin.$system.update({
                            allow_new_reg: _this.allowReg
                        }).then(done => {
                            if (done)
                            {
                                $Auth.getSysSettings()
                                return done
                            }
                        })
                    }

                })
        }
    },

    mounted () {
        // this.allowReg = this.settings.allow_new_reg
    }
})

</script>
<style lang="scss" scoped>
.TContaner {
    padding: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid rgb(200, 200, 200);
    letter-spacing: 1px;
    font-size: 0.8rem;
    padding: 10px;
    text-align: left;
}

table input[type="checkbox"],
table input[type="checkbox"] {
    width: 1.3em;
    height: 1.3em;
}

td,
th {
    /* border: 1px solid rgb(190, 190, 190); */
    padding: 10px;
}

thead,
tfoot {
    height: 0px !important;
    font-weight: bold;
    border-top: solid 2px rgb(200, 200, 200);
    border-bottom: solid 2px rgb(200, 200, 200);
}
</style>