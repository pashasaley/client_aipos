<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Papers</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.paper-modal>Add Paper</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
		<th scope="col">Conference</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(paper, index) in papers" :key="index">
              <td>{{ paper.name }}</td>
              <td>{{ paper.description }}</td>
		<td>{{ paper.conf_name }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.paper-update-modal
			@click="editPaper(paper)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeletePaper(paper)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addPaperModal"
         id="paper-modal"
         name="Add a new paper"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addPaperForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-description-group"
                  label="Description:"
                  label-for="form-description-input">
        <b-form-input id="form-description-input"
                      type="text"
                      v-model="addPaperForm.description"
                      required
                      placeholder="Enter description">
        </b-form-input>
      </b-form-group>
	<b-form-group id="form-conference_name-group"
                  label="Conference:"
                  label-for="form-conference_name-input">
        <select class="form-control" id="form-conference_name-edit-input"
		v-model="addPaperForm.conference_name">
                                <option v-for="(conference, index) in conferences" :key="index">{{ conference.name }}</option>
                    </select>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editPaperModal"
         id="paper-update-modal"
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
    <b-form-group id="form-description-edit-group"
                  label="description:"
                  label-for="form-description-edit-input">
        <b-form-input id="form-description-edit-input"
                      type="text"
                      v-model="editForm.description"
                      required
                      placeholder="Enter description">
        </b-form-input>
      </b-form-group>
	<b-form-group id="form-conference_name-group"
                  label="Conference:"
        <select class="form-control" id="form-conference_name-edit-input"
		v-model="editForm.conference_name">
                                <option v-for="(conference, index) in conferences" :key="index">{{ conference.name }}</option>
                    </select>
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
      papers: [],
	addPaperForm: {
        name: '',
        description: '',
	conference_name:'',
      },
	editForm: {
	  name: '',
	  description: '',
	conference_name:'',
	},
    };
  },
  methods: {
    getPapers() {
      const path = 'http://localhost:5001/paper';
      axios.get(path)
        .then((res) => {
          this.papers = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log('dddddddd')
        });
    },
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
  addPaper(payload) {
      const path = 'http://localhost:5001/paper/add';
      axios.post(path, payload)
        .then(() => {
          this.getPapers();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getPapers();
        });
    },
	updatePaper(payload, paperID) {
	  const path = `http://localhost:5001/paper/${paperID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getPapers();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPapers();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPaperModal.hide();
	  this.initForm();
	  this.getPapers();
	},
    initForm() {
      this.addPaperForm.name = '';
      this.addPaperForm.description = '';
	this.addPaperForm.conference_name = '';
	this.editForm.name = '';
	this.editForm.description = '';
	this.editForm.conference_name = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPaperModal.hide();
      const payload = {
        name: this.addPaperForm.name,
        description: this.addPaperForm.description,
	conference_name: this.addPaperForm.conference_name,
      };
      this.addPaper(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addPaperModal.hide();
      this.initForm();
    },
	editPaper(paper) {
	  this.editForm = paper;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPaperModal.hide();
	  const payload = {
	    name: this.editForm.name,
	    description: this.editForm.description,
	    conference_name: this.editForm.conference_name,
	  };
	  this.updatePaper(payload, this.editForm.id);
	},
	removePaper(paperID) {
	  const path = `http://localhost:5001/paper/${paperID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getPapers();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPapers();
	    });
	},
	onDeletePaper(paper) {
	  this.removePaper(paper.id);
	},
  },
  created() {
    this.getPapers();
	this.getConferences();
  },
};
</script>
