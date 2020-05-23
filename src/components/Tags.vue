<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tags</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.tag-modal>Add Tag</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Paper</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tag, index) in tags" :key="index">
              <td>{{ tag.name }}</td>
              <td>{{ tag.paper_name }}</td>
		<td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.tag-update-modal
			@click="editTag(tag)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteTag(tag)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addTagModal"
         id="tag-modal"
         name="Add a new tag"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addTagForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-paper_name-group"
                  label="Paper:"
                  label-for="form-paper_name-input">
        <select class="form-control" id="form-paper_name-edit-input"
		v-model="addTagForm.paper_name">
                                <option v-for="(paper, index) in papers" :key="index">{{ paper.name }}</option>
                    </select>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editTagModal"
         id="tag-update-modal"
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
    <b-form-group id="form-paper_name-edit-group"
                  label="paper_name:"
                  label-for="form-paper_name-edit-input">
        <select class="form-control" id="form-paper_name-edit-input"
		v-model="addTagForm.paper_name">
                                <option v-for="(paper, index) in papers" :key="index">{{ paper.name }}</option>
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
      tags: [],
	addTagForm: {
        name: '',
        paper_name: '',
      },
	editForm: {
	  name: '',
	  paper_name: '',
	},
    };
  },
  methods: {
    getTags() {
      const path = 'http://localhost:5001/tag';
      axios.get(path)
        .then((res) => {
          this.tags = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
	getPapers() {
      const path = 'http://localhost:5001/paper';
      axios.get(path)
        .then((res) => {
          this.papers = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
  addTag(payload) {
      const path = 'http://localhost:5001/tag/add';
      axios.post(path, payload)
        .then(() => {
          this.getTags();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getTags();
        });
    },
	updateTag(payload, tagID) {
	  const path = `http://localhost:5001/tag/${tagID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getTags();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getTags();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editTagModal.hide();
	  this.initForm();
	  this.getTags();
	},
    initForm() {
      this.addTagForm.name = '';
      this.addTagForm.paper_name = '';
	this.editForm.name = '';
	this.editForm.paper_name = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addTagModal.hide();
      const payload = {
        name: this.addTagForm.name,
        paper_name: this.addTagForm.paper_name,
      };
      this.addTag(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addTagModal.hide();
      this.initForm();
    },
	editTag(tag) {
	  this.editForm = tag;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editTagModal.hide();
	  const payload = {
	    name: this.editForm.name,
	    paper_name: this.editForm.paper_name,
	  };
	  this.updateTag(payload, this.editForm.id);
	},
	removeTag(tagID) {
	  const path = `http://localhost:5001/tag/${tagID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getTags();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getTags();
	    });
	},
	onDeleteTag(tag) {
	  this.removeTag(tag.id);
	},
  },
  created() {
    this.getTags();
	this.getPapers();
  },
};
</script>
