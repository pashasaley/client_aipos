<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Presentations</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.presentation-modal>Add Presentation</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Speaker</th>
              <th scope="col">Room</th>
		<th scope="col">Paper</th>
		<th scope="col">Start</th>
		<th scope="col">End</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(presentation, index) in presentations" :key="index">
              <td>{{ presentation.speaker_username }}</td>
              <td>{{ presentation.room_name }}</td>
		<td>{{ presentation.paper_name }}</td>
		<td>{{ presentation.start }}</td>
		<td>{{ presentation.end }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.presentation-update-modal
			@click="editPresentation(presentation)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeletePresentation(presentation)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addPresentationModal"
         id="presentation-modal"
         speaker="Add a new presentation"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-speaker-group"
                label="Speaker:"
                label-for="form-speaker_name-input">
      <select class="form-control" id="form-speaker_name-edit-input"
		v-model="addPresentationForm.speaker_name">
                                <option v-for="(speaker, index) in speakers" :key="index">{{ speaker.username }}</option>
                    </select>
    </b-form-group>
    <b-form-group id="form-room_name-group"
                  label="Room:"
                  label-for="form-room_name-input">
        <select class="form-control" id="form-room_name-edit-input"
		v-model="addPresentationForm.room_name">
                                <option v-for="(room, index) in rooms" :key="index">{{ room.name }}</option>
                    </select>
      </b-form-group>
	<b-form-group id="form-paper_name-group"
                  label="Paper:"
                  label-for="form-paper_name-input">
        <select class="form-control" id="form-paper_name-edit-input"
		v-model="addPresentationForm.paper_name">
                                <option v-for="(paper, index) in papers" :key="index">{{ paper.name }}</option>
                    </select>
      </b-form-group>
	<b-form-group id="form-start-group"
                  label="Start:"
                  label-for="form-start-input">
        <b-form-input id="form-start-input"
                      type="datetime-local"
                      v-model="addPresentationForm.start"
                      required
                      placeholder="Enter start">
        </b-form-input>
      </b-form-group>
	<b-form-group id="form-end-group"
                  label="End:"
                  label-for="form-end-input">
        <b-form-input id="form-end-input"
                      type="datetime-local"
                      v-model="addPresentationForm.end"
                      required
                      placeholder="Enter end">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editPresentationModal"
         id="presentation-update-modal"
         speaker="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-speaker-group"
                label="Speaker:"
                label-for="form-speaker_name-input">
      <select class="form-control" id="form-speaker_name-edit-input"
		v-model="editForm.speaker_name">
                                <option v-for="(speaker, index) in speakers" :key="index">{{ speaker.username }}</option>
                    </select>
    </b-form-group>
    <b-form-group id="form-room_name-group"
                  label="Room:"
                  label-for="form-room_name-input">
        <select class="form-control" id="form-room_name-edit-input"
		v-model="editForm.room_name">
                                <option v-for="(room, index) in rooms" :key="index">{{ room.name }}</option>
                    </select>
      </b-form-group>
	<b-form-group id="form-paper_name-group"
                  label="Paper:"
                  label-for="form-paper_name-input">
        <select class="form-control" id="form-paper_name-edit-input"
		v-model="editForm.paper_name">
                                <option v-for="(paper, index) in papers" :key="index">{{ paper.name }}</option>
                    </select>
      </b-form-group>
	<b-form-group id="form-start-group"
                  label="Start:"
                  label-for="form-start-input">
        <b-form-input id="form-start-input"
                      type="datetime-local"
                      v-model="editForm.start"
                      required
                      placeholder="Enter start">
        </b-form-input>
      </b-form-group>
	<b-form-group id="form-end-group"
                  label="End:"
                  label-for="form-end-input">
        <b-form-input id="form-end-input"
                      type="datetime-local"
                      v-model="editForm.end"
                      required
                      placeholder="Enter end">
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
      presentations: [],
	addPresentationForm: {
        speaker_name: '',
        room_name: '',
	paper_name: '',
	start: '',
	end: '',
      },
	editForm: {
		speaker_name: '',
		room_name: '',
		paper_name: '',
		start: '',
		end: '',
	},
    };
  },
  methods: {
    getPresentations() {
      const path = 'http://localhost:5001/presentation';
      axios.get(path)
        .then((res) => {
          this.presentations = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
	getSpeakers() {
      const path = 'http://localhost:5001/user';
      axios.get(path)
        .then((res) => {
          this.speakers = res.data;
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.error(error);
        });
    },
	getRooms() {
      const path = 'http://localhost:5001/room';
      axios.get(path)
        .then((res) => {
          this.rooms = res.data;
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
  addPresentation(payload) {
      const path = 'http://localhost:5001/presentation/add';
      axios.post(path, payload)
        .then(() => {
          this.getPresentations();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getPresentations();
        });
    },
	updatePresentation(payload, presentationID) {
	  const path = `http://localhost:5001/presentation/${presentationID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getPresentations();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPresentations();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPresentationModal.hide();
	  this.initForm();
	  this.getPresentations();
	},
    initForm() {
      this.addPresentationForm.speaker_name = '';
      this.addPresentationForm.room_name = '';
	this.addPresentationForm.start = '';
	this.addPresentationForm.paper_name = '';
	this.addPresentationForm.end = '';
	this.editForm.speaker_name = '';
	this.editForm.room_name = '';
	this.editForm.paper_name = '';
	this.editForm.start = '';
	this.editForm.end = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addPresentationModal.hide();
      const payload = {
        speaker_name: this.addPresentationForm.speaker_name,
	room_name: this.addPresentationForm.room_name,
	paper_name: this.addPresentationForm.paper_name,
	start: this.addPresentationForm.start,
        end: this.addPresentationForm.end,
      };
      this.addPresentation(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addPresentationModal.hide();
      this.initForm();
    },
	editPresentation(presentation) {
	  this.editForm = presentation;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editPresentationModal.hide();
	  const payload = {
	    speaker_name: this.editForm.speaker_name,
	room_name: this.editForm.room_name,
	paper_name: this.editForm.paper_name,
	start: this.editForm.start,
	    end: this.editForm.end,
	  };
	  this.updatePresentation(payload, this.editForm.id);
	},
	removePresentation(presentationID) {
	  const path = `http://localhost:5001/presentation/${presentationID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getPresentations();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getPresentations();
	    });
	},
	onDeletePresentation(presentation) {
	  this.removePresentation(presentation.id);
	},
  },
  created() {
	this.getPresentations();
	this.getSpeakers();
	this.getRooms();
	this.getPapers();
  },
};
</script>
