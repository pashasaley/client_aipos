<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Rooms</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.room-modal>Add Room</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(room, index) in rooms" :key="index">
              <td>{{ room.name }}</td>
              <td>{{ room.location }}</td>
              <td>
                <button
			type="button"
			class="btn btn-warning btn-sm"
			v-b-modal.room-update-modal
			@click="editRoom(room)">
		    Update
		</button>
                <button
			type="button"
			class="btn btn-danger btn-sm"
			@click="onDeleteRoom(room)">
		    Delete
		</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
<b-modal ref="addRoomModal"
         id="room-modal"
         name="Add a new room"
         hide-footer>
  <b-form @submit="onSubmit" @reset="onReset" class="w-100">
  <b-form-group id="form-name-group"
                label="Name:"
                label-for="form-name-input">
      <b-form-input id="form-name-input"
                    type="text"
                    v-model="addRoomForm.name"
                    required
                    placeholder="Enter name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-location-group"
                  label="Location:"
                  label-for="form-location-input">
        <b-form-input id="form-location-input"
                      type="text"
                      v-model="addRoomForm.location"
                      required
                      placeholder="Enter location">
        </b-form-input>
      </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-modal> 
<b-modal ref="editRoomModal"
         id="room-update-modal"
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
    <b-form-group id="form-location-edit-group"
                  label="location:"
                  label-for="form-location-edit-input">
        <b-form-input id="form-location-edit-input"
                      type="text"
                      v-model="editForm.location"
                      required
                      placeholder="Enter location">
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
      rooms: [],
	addRoomForm: {
        name: '',
        location: '',
      },
	editForm: {
	  name: '',
	  location: '',
	},
    };
  },
  methods: {
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
  addRoom(payload) {
      const path = 'http://localhost:5001/room/add';
      axios.post(path, payload)
        .then(() => {
          this.getRooms();
        })
        .catch((error) => {
          // eslint-отключение следующей строки
          console.log(error);
          this.getRooms();
        });
    },
	updateRoom(payload, roomID) {
	  const path = `http://localhost:5001/room/${roomID}`;
	  axios.put(path, payload)
	    .then(() => {
	      this.getRooms();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getRooms();
	    });
	},
	onResetUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editRoomModal.hide();
	  this.initForm();
	  this.getRooms();
	},
    initForm() {
      this.addRoomForm.name = '';
      this.addRoomForm.location = '';
	this.editForm.name = '';
	this.editForm.location = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addRoomModal.hide();
      const payload = {
        name: this.addRoomForm.name,
        location: this.addRoomForm.location,
      };
      this.addRoom(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addRoomModal.hide();
      this.initForm();
    },
	editRoom(room) {
	  this.editForm = room;
	},
	onSubmitUpdate(evt) {
	  evt.preventDefault();
	  this.$refs.editRoomModal.hide();
	  const payload = {
	    name: this.editForm.name,
	    location: this.editForm.location,
	    read,
	  };
	  this.updateRoom(payload, this.editForm.id);
	},
	removeRoom(roomID) {
	  const path = `http://localhost:5001/room/${roomID}`;
	  axios.delete(path)
	    .then(() => {
	      this.getRooms();
	    })
	    .catch((error) => {
	      // eslint-отключение следующей строки
	      console.error(error);
	      this.getRooms();
	    });
	},
	onDeleteRoom(room) {
	  this.removeRoom(room.id);
	},
  },
  created() {
    this.getRooms();
  },
};
</script>
