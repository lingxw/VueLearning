<template>
    <el-tree
    :props="props"
    :load="loadNode"
    lazy
    >
        <span class="icon-tree-node" slot-scope="{ node }">
            <i :class="node.data.role.icon"/>
            {{ node.data.name }}
        </span>   
    </el-tree>
</template>

<script>
  import { fetchListByRole }  from '../../api/user'
  export default {
    data() {
      return {
        roles: [
            {
                id:0,
                name:'Root',
                icon:'el-icon-s-home'
            },
            {
                id:1,
                name:'Admin',
                icon:'el-icon-user'
            },
            {
                id:2,
                name:'Vip',
                icon:'el-icon-s-custom'
            },
            {
                id:3,
                name:'User',
                icon:'el-icon-user-solid'
            }
        ],
        props: {
          label: 'name',
          children: 'children',
          isLeaf: 'leaf'
        },
        //nodeChilds:[],
        count: 1
      };
    },
    methods: {
      loadNode(node, resolve) {
        if (node.level === 0) 
            return resolve([{
                name:'Root',
                role:this.roles[0],
                summary:''
            }]);
        if (node.level > 2) 
            return resolve([]);
        setTimeout(() => {
            var data;
            if(node.data.role.id === 0) {
                data = [
                    {
                        name:'Admin',
                        role:this.roles[1],
                        summary:'管理员'
                    }, 
                    {
                        name:'Vip',
                        role:this.roles[2],
                        summary:'Vip用户'
                    },
                    {
                        name:'User',
                        role:this.roles[3],
                        summary:'普通用户'
                    }
                ];
            } else if(node.data.role.id === 2 
                    || node.data.role.id === 3) {
                fetchListByRole(node.data.role.id).then(response => {
                    let code = response.data.code;
                    if (code == 20000) {
                        this.nodeChilds = response.data.nodeChilds;
                    } else {
                        this.nodeChilds = [];
                    }
                     console.log("1:" + this.nodeChilds);
                });
                console.log("2:" + this.nodeChilds);
                data = this.nodeChilds;
                if(!data) {
                   data = [];
                }
            } else {
                data = [];
            }
            console.log("3:" + this.nodeChilds);
            resolve(data);
        }, 200);
      }
    }
  };
</script>