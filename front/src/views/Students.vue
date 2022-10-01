<template>
  <v-container>
    <v-layout>
      <v-card>
        <v-card-title>
          <v-layout justify-center class="align-start">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Pesquisar"
              outlined
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn elevation="2" outlined>Cadastrar Aluno</v-btn>
          </v-layout>
        </v-card-title>
        <v-data-table
          :footer-props="{
            'items-per-page-text': 'Linhas por página:',
          }"
          :headers="headers"
          :items="users"
          :search="search"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.ra }}</td>
              <td class="text-xs-right">{{ item.name }}</td>
              <td class="text-xs-right">{{ item.cpf }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editUser(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteUser(item)"
                  >mdi-delete</v-icon
                >
              </td>
            </tr>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Não houve resultados na sua busca por "{{ search }}".
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import ConfigApis from "@/apis/configApis";

export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Registro Acadêmico",
        align: "center",
        sortable: true,
        value: "ra",
      },
      { text: "Nome", value: "name", align: "center" },
      { text: "CPF", value: "cpf", align: "center" },
      { text: "Actions", value: "acoes", align: "right", sortable: false },
    ],
    users: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.users = await ConfigApis.getStudents();
    },

    editUser(user) {
      this.editedIndex = this.users.indexOf(user);
      this.editedUser = Object.assign({}, user);
      this.dialog = true;
    },

    async deleteUser(student) {
      const index = this.users.indexOf(student);
      confirm("Tem certeza que deseja excluir esse aluno?") &&
        await ConfigApis.deleteStudent(student.id);
        this.users.splice(index, 1);
    },
  },
};
</script>
