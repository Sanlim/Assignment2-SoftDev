<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create a new Funread</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateFunrun">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="ชื่อเรื่อง"
              id="title"
              v-model="title"
              required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="location"
              label="เรื่องย่อ"
              id="location"
              v-model="location"
              required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised color="indigo darken-4" dark @click="onPickFile">อัปโหลดรูปการ์ตูน 1</v-btn>
              <input type=file style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked"></input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200">
            </v-flex>
          </v-layout>

            <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised dark color="indigo darken-4" @click="onPickFile2">อัปโหลดรูปการ์ตูน 2</v-btn>
              <input type=file style="display: none" ref="fileInput2" accept="image/*" @change="onFilePicked2"></input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl2" height="200">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised dark color="indigo darken-4" @click="onPickFile3">อัปโหลดรูปการ์ตูน 3</v-btn>
              <input type=file style="display: none" ref="fileInput3" accept="image/*" @change="onFilePicked3"></input>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl3" height="200">
            </v-flex>
          </v-layout>

          

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="description"
              label="คำอธิบายการ์ตูน"
              id="description"
              v-model="description"
              multi-line
              required></v-text-field>
            </v-flex>
          </v-layout>
<!--
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a date and time</h4>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
-->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
              class="primary"
              :disabled="!formIsValid"
              type="submit">เพิ่มการ์ตูน</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        imageUrl2: '',
        imageUrl3: '',
        description: '',
        date: '',
        time: new Date(),
        image: null,
        image2: null,
        image3: null
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.imageUrl2 !== '' &&
        this.imageUrl3 !== '' &&
        this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return
      }
    },
    methods: {
      onCreateFunrun () {
        if (!this.formIsValid) {
          return
        }
        if (!this.image) {
          return
        }
        if (!this.image2) {
          return
        }
        if (!this.image3) {
          return
        }
        const funrunData = {
          title: this.title,
          location: this.location,
          image: this.image,
          image2: this.image2,
          image3: this.image3,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createFunrun', funrunData)
        this.$router.push('/funreads/')
      },
      onPickFile () {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },

      onPickFile2 () {
        this.$refs.fileInput2.click();
      },
      onFilePicked2 (event) {
        const files = event.target.files
        let filename2 = files[0].name
        if (filename2.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl2 = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image2 = files[0]
      },

      onPickFile3 () {
        this.$refs.fileInput3.click();
      },
      onFilePicked3 (event) {
        const files = event.target.files
        let filename3 = files[0].name
        if (filename3.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl3 = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image3 = files[0]
      }
    }
  }
</script>
