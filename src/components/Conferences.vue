<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Conferences</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.conference-modal>Add Conference</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Start</th>
		<th scope="col">End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(conference, index) in conferences" :key="index">
              <td>{{ conference.name }}</td>
              <td>{{ conference.start }}</td>
		<td>{{ conference.end }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.conference-update-modal
			@click="editConference(conference)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteConference(conference)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addConferenceModal"
         id="conference-modal"
         name="Add a new conference"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addConferenceForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-start-group"
                  label="Start:"
                  label-for="form-start-input">
        <b-form-input id="form-start-input"
                      type="date"
                      v-model="addConferenceForm.start"
                      required
                      placeholder="Enter start date ">
        </b-form-input>
      </b-form-group>
	<b-form-group id="form-end-group"
                label="End:"
                label-for="form-end-input">
      <b-form-input id="form-end-input"
                    type="date"
                    v-model="addConferenceForm.end"
                    required
                    placeholder="Enter end date ">
      </b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editConferenceModal"
         id="conference-update-modal"
         name="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-name-edit-group"
                label="name:"
                label-for="form-name-edit-input">
      <b-form-input id="form-name-edit-input"
                    type="text"
                    v-model="editForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-start-edit-group"
                  label="Start:"
                  label-for="form-start-edit-input">
        <b-form-input id="form-start-edit-input"
                      type="date"
                      v-model="editForm.start"
                      required
                      placeholder="Enter start date ">
        </b-form-input>
      </b-form-group>
	<b-form-input id="form-end-edit-input"
                    type="date"
                    v-model="addConferenceForm.end"
                    required
                    placeholder="Enter end date ">
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
      conferences: [],
	addConferenceForm: {
        name: '',
        start: '',
	end: '',
      },
	editForm: {
	  name: '',
	  start: '',
	end: '',
	},
    };
  },
  methods: {
    getConferences() {
      const path = 'http://localhost:5001/conference';
      axios.get(path)
        .then((res) => {
          this.conferences = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addConference(payload) {
      const path = 'http://localhost:5001/conference/add';
      axios.post(path, payload)
        .then(() => {
          this.getConferences();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getConferences();
        });
    },
	updateConference(payload, conferenceID) {
	  const path = `http://localhost:5001/conference/${conferenceID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getConferences();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getConferences();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editConferenceModal.hide();
	  this.initForm();
	  this.getConferences();
	},
    initForm() {
      this.addConferenceForm.name = '';
      this.addConferenceForm.start = '';
	this.editForm.name = '';
	this.editForm.start = '';
	this.editForm.end = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addConferenceModal.hide();
      const payload = {
        name: this.addConferenceForm.name,
        start: this.addConferenceForm.start,
	end: this.addConferenceForm.end,
      };
      this.addConference(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addConferenceModal.hide();
      this.initForm();
    },
	editConference(conference) {
	  this.editForm = conference;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editConferenceModal.hide();
	  const payload = {
	    name: this.editForm.name,
	    start: this.editForm.start,
	start: this.editForm.start,
	  };
	  this.updateConference(payload, this.editForm.id);
	},
	removeConference(conferenceID) {
	  const path = `http://localhost:5001/conference/${conferenceID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getConferences();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getConferences();
	    });
	},
	onDeleteConference(conference) {
	  this.removeConference(conference.id);
	},
  },
  created() {
    this.getConferences();
  },
};
</script>
