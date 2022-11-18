<template>
    <v-main>
            <v-row justify="center" align="center" style="margin:3px;">
                <v-col v-for="album in albums" :key="album.album">
                <v-card elevation="3" :style="{ backgroundColor: RandomColor() }">
                    <div style="text-align:center" >
                    <v-card-title primary-title class="justify-center">{{ album.album }}</v-card-title>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
</template>
<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

    thead tr th span {
        font-size: 160% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 600;
        color: black !important;
    }

    tbody tr td{
        font-size: 100% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 100;
        color: black !important;
    }

    .textfield{
        font-family: Poppins !important;
        color: black;
    }

    .v-list-item__title{
        font-family: Poppins !important;
        color: black;
    }

</style>

<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

    thead tr th span {
        font-size: 160% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 600;
        color: black !important;
    }

    tbody tr td{
        font-size: 100% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 100;
        color: black !important;
    }

    .textfield{
        font-family: Poppins !important;
        color: black;
    }

    .v-list-item__title{
        font-family: Poppins !important;
        color: black;
    }

</style>

<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

    thead tr th span {
        font-size: 160% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 600;
        color: black !important;
    }

    tbody tr td{
        font-size: 100% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 100;
        color: black !important;
    }

    .textfield{
        font-family: Poppins !important;
        color: black;
    }

    .v-list-item__title{
        font-family: Poppins !important;
        color: black;
    }

</style>

<script>
//tambahkan code untuk import database reference dan fungsi bawaan dari firebase database
import { db } from "../firebase";
import { ref,set,remove,push,onValue } from '@firebase/database';

export default {
    name: "AlbumPage",
    data () {
        return {
            load: false,
            search: '',
            filter: '',
            snackbar: false,
            error_message: '',
            color: '',

            items: ['SM', 'JYP', 'HYBE', 'YG'],
            itemsektra:  ['Bookmark','Sticker','Fan'],

            headers: [
                {text: "Album Name", value: "album"},
                {text: "Artist Name", value: "artist"},
                {text: "Agency", value: "agency"},
                {text: "Price", value: "price"},
                {text: "Stock", value: "stock"},
                {text: "extra", value: "extra"},
                {text: "", value: "actions"},
            ],
            type:[
                'Hot',
                'Cool',
                'Cold',
            ],
            inputRules: [
                (v) => !!v || 'Must be filled!',
            ],
            album : new FormData,
            albums: [],
            dialog: false,
            dialogConfirm: false,
            form: {
                album: '',
                artist: '',
                agency: '',
                price: '',
                stock: '',
                extra: '',
            },
            formType: 0,
            selectedId: '',
        }
    },

    created() {
        // tambahkan fungsi untuk retrieve data
        onValue(ref(db, 'albums'), (snapshot) => {
            this.albums = [],
            snapshot.forEach((album) => {
                this.albums.push({
                    id: album.key,
                    album: album.val().album,
                    artist: album.val().artist,
                    agency: album.val().agency,
                    price: album.val().price,
                    stock: album.val().stock,
                    extra: album.val().extra
                });
            })
        })

    },

    methods: {
        saveData() {
            //tambahkan fungsi untuk create dan update data
            if(this.formType == -1) {
                set(ref(db, "albums/" + this.selectedId), this.form)
                .then(() => {
                    this.snackbar = true;
                    this.error_message = "Update Data Success!";
                    this.color = "green";
                    this.closeDialog();
                }).catch((err) => {
                    this.error_message = "Update Data Failed:!" + err;
                    this.color = "red";
                    this.closeDialog();
                })
            } else {
                push(ref(db, "albums"), this.form)
                .then(() => {
                    this.snackbar = true;
                    this.error_message = "Add Data Success!";
                    this.color = "green";
                    this.closeDialog();
                }).catch((err) => {
                    this.error_message = "Add Data Failed:!" + err;
                    this.color = "red";
                    this.closeDialog();
                })
            }
            
        },

        editData(item){
            this.dialog = true; 
            this.formType = -1; 
            this.form = Object.assign({}, item);
            this.selectedId = item.id;
        },

        deleteData() {
            //tambahkan fungsi untuk delete data
            remove(ref(db, "albums/" + this.selectedId))
            .then(() => {
                this.dialogConfirm = false;
                this.snackbar = true;
                this.error_message = "Delete Data Succes!";
                this.color = "green";
            }).catch((err) => {
                this.dialogConfirm = false;
                this.snackbar = true;
                this.error_message = "Add Data Failed!" + err;
                this.color = "red";
            })
        },

        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },

        RandomColor() {
        return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
        }
    },

    computed: {
        formTitle() {
            return this.formType === 0 ? "Create Album" : "Update Album";
        },
    },

}
</script>