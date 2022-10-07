<template>
  <Layout>
    <template #children>
      <div>
        <div>
          <a-space>
            <a-button type='primary'>
              Add new
            </a-button>
          </a-space>
        </div>
        <div class="error" v-if="blackBooks.error">{{blackBooks.error}}</div>
        <a-table
          v-else
          :data-source="blackBooks.data"
          :columns="columns"
          :pagination="pagination"
        />
      </div>
    </template>
  </Layout>
</template>

<style scoped>

</style>

<script lang="ts">
  import Layout from "@/components/Layout.vue";
  import {mapActions, mapState} from "vuex";
  export default {
    setup() {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
        },
        {
          title: 'State',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          align: 'center' as const,
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'createdAt',
        },
      ];

      return {
        columns
      }
    },
    components: {
      Layout
    },
    mounted(): void {
      const { paramsData } = this.blackBooks;
      this.getBlackBooks(paramsData);
    },
    computed: {
      ...mapState({
        blackBooks: 'blackBooks',
        pagination: state => {
          console.log(111, state.blackBooks);
          const { paramsData, total } = state.blackBooks;
          return {
            current: paramsData.page,
            pageSize: paramsData.limit,
            pageSizeOptions: [10, 20, 50, 100],
            total,
            showSizeChanger: true,
            showTotal: (total: number, range: Array<number>) => `${range[0]}-${range[1]} of ${total}`,
            onChange: (current: number, size: number) => {
              this.setParamsBlackBook({ paramsData, page: current, limit: size });
            },
          }
        },
      })
    },

    methods: {
      ...mapActions({
        getBlackBooks: 'getBlackBooks',
        setParamsBlackBook: 'setParamsBlackBook',
      }),
    }
  }
</script>
