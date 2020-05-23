<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Users</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.user-modal>Add User</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.user-update-modal
			@click="editUser(user)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteUser(user)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addUserModal"
         id="user-modal"
         username="Add a new user"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-username-group"
                label="Username:"
                label-for="form-username-input">
      <b-form-input id="form-username-input"
                    type="text"
                    v-model="addUserForm.username"
                    required
                    placeholder="Enter username">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-email-group"
                  label="Email:"
                  label-for="form-email-input">
        <b-form-input id="form-email-input"
                      type="email"
                      v-model="addUserForm.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editUserModal"
         id="user-update-modal"
         username="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-username-edit-group"
                label="username:"
                label-for="form-username-edit-input">
      <b-form-input id="form-username-edit-input"
                    type="text"
                    v-model="editForm.username"
                    required
                    placeholder="Enter username">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-email-edit-group"
                  label="email:"
                  label-for="form-email-edit-input">
        <b-form-input id="form-email-edit-input"
                      type="email"
                      v-model="editForm.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Update</b-button>
    <b-button type="reset" variant="danger">Cancel</b-button>
  </b-form>
</b-modal> 
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
	addUserForm: {
        username: '',
        email: '',
      },
	editForm: {
	  username: '',
	  email: '',
	},
    };
  },
  methods: {
    getUsers() {
      const path = 'http://localhost:5001/user';
      axios.get(path)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addUser(payload) {
      const path = 'http://localhost:5001/user/add';
      axios.post(path, payload)
        .then(() => {
          this.getUsers();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getUsers();
        });
    },
	updateUser(payload, userID) {
	  const path = `http://localhost:5001/user/${userID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getUsers();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getUsers();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editUserModal.hide();
	  this.initForm();
	  this.getUsers();
	},
    initForm() {
      this.addUserForm.username = '';
      this.addUserForm.email = '';
	this.editForm.username = '';
	this.editForm.email = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addUserModal.hide();
      const payload = {
        username: this.addUserForm.username,
        email: this.addUserForm.email,
      };
      this.addUser(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addUserModal.hide();
      this.initForm();
    },
	editUser(user) {
	  this.editForm = user;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editUserModal.hide();
	  const payload = {
	    username: this.editForm.username,
	    email: this.editForm.email,
	    read,
	  };
	  this.updateUser(payload, this.editForm.id);
	},
	removeUser(userID) {
	  const path = `http://localhost:5001/user/${userID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getUsers();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getUsers();
	    });
	},
	onDeleteUser(user) {
	  this.removeUser(user.id);
	},
  },
  created() {
    this.getUsers();
  },
};
</script>
