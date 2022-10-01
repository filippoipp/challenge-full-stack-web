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

            <v-btn elevation="2" outlined @click="showModal = true">Cadastrar Aluno</v-btn>
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
                <v-icon small class="mr-2" @click="handleEdit(item)"
                  >mdi-pencil</v-icon
                >
                <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
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

    <v-dialog v-model="showModal" persistent max-width="600px">
      <v-form
        v-model="valid_student"
        id="student-form"
        @submit.prevent="submit"
        ref="form"
        lazy-validation
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{option === 'edit' ? 'Editar' : 'Cadastrar'}} Aluno</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex sm12>
                  <v-text-field
                    required
                    label="Nome"
                    v-model="student.name"
                    outlined
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
                <v-flex sm12>
                  <v-text-field
                    required
                    label="Email"
                    v-model="student.email"
                    outlined
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>

                <v-flex sm12 v-show="student.ra">
                  <v-text-field
                    label="RA"
                    v-model="student.ra"
                    disabled
                    outlined
                  ></v-text-field>
                </v-flex>

                <v-flex sm12>
                  <v-text-field
                    required
                    label="CPF"
                    v-model="student.cpf"
                    type="number"
                    :disabled="option === 'edit' ? true : false"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModal()"
              >Cancelar</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              form="student-form"
              >{{option === 'edit' ? 'Editar' : 'Cadastrar'}}</v-btn
            >
          </v-card-actions>
          <v-alert dismissible :type="error_type" v-model="error">{{
            error_text
          }}</v-alert>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import ConfigApis from "@/apis/configApis";

export default {
  data: () => ({
    search: "",
    showModal: false,
    headers: [
      {
        text: "Registro Acadêmico",
        align: "left",
        sortable: true,
        value: "ra",
      },
      { text: "Nome", value: "name", align: "center" },
      { text: "CPF", value: "cpf", align: "center" },
      { text: "Ações", value: "acoes", align: "right", sortable: false },
    ],
    option: '',
    users: [],
    student: {},
    student_id: null,
    error_text: "",
    error_type: "error",
    error: false,
    valid_student: true,
    rules: {
      required(value) {
        return !!value || "Campo obrigatório.";
      },
    },
  }),

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      this.users = await ConfigApis.getStudents();
    },

    async submit(forced) {
      if (forced === true || this.$refs.form.validate()) {
        try {
          this.option === 'edit' ? await ConfigApis.updateStudent(this.student_id, this.student) : await ConfigApis.createStudent(this.student);
          this.closeModal();
          this.initialize();
        } catch (error) {
          this.error = true;
          this.error_type = "error";
          this.error_text = error.message;
        }
      }

    },

    async handleEdit(user) {
      this.student = user;
      this.student_id = user.id
      this.option = 'edit';
      this.showModal = true;
    },

    async deleteStudent(student) {
      const index = this.users.indexOf(student);
      confirm("Tem certeza que deseja excluir esse aluno?") &&
        (await ConfigApis.deleteStudent(student.id));
      this.users.splice(index, 1);
    },

    closeModal() {
      this.showModal = false;
      this.option = '';
      this.student = {};
    }
  },

  watch: {
    error: function (newValue) {
      if (newValue) {
        setTimeout(function () {
          this.error = false;
        }, 5000);
      }
    },
  },
};
</script>
