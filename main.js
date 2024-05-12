
const app = Vue.createApp({
  data() {
    return {
      searchText: '',
      picture: 'https://randomuser.me/api/portraits/women/83.jpg',
      firstName: 'Hortência',
      lastName: 'F.',
      email: 'flores@email.com',
      city: 'Cajamar',
      state: 'SP',
      country: 'Brasil',
      phone: '(21) 99999-9999',
      birthday: '1990-01-01',
      gender: 'female',
      listContacts: [
        // {
        //   firstName: 'João',
        //   lastName: 'Silva',
        //   email: 'joao@email.com',
        //   city: 'São Paulo',
        //   phone: '(11) 88888-8888',
        //   picture: 'https://randomuser.me/api/portraits/men/54.jpg'
        // },
        // {
        //   firstName: 'Maria',
        //   lastName: 'Oliveira',
        //   email: 'maria@email.com',
        //   city: 'Rio de Janeiro',
        //   phone: '(21) 77777-7777',
        //   picture: 'https://randomuser.me/api/portraits/women/10.jpg'
        // },
        // {
        //   firstName: 'John',
        //   lastName: 'Doe',
        //   email: 'john@email.com',
        //   city: 'New York',
        //   phone: '+1 (212) 555-5555',
        //   picture: 'https://randomuser.me/api/portraits/men/4.jpg'
        // },
        // {
        //   firstName: 'Alice',
        //   lastName: 'Smith',
        //   email: 'alice@email.com',
        //   city: 'London',
        //   phone: '+44 20 1234 5678',
        //   picture: 'https://randomuser.me/api/portraits/women/50.jpg'
        // }
      ]
    }
  },
  computed: {
    listResult: function () {
      if (this.searchText) {
        return this.listContacts.filter(contact => {
          return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(this.searchText.toLowerCase())
        });
      } else {
        return this.listContacts;
      }
    }
  },
  async mounted() {
    this.listResult = await this.getData();
  },
  methods: {
    sayHello: () => {
      alert('Olar.');
    },
    changeData: function () {
      if (this.lastName == 'F.') {
        this.lastName = 'Flores'
      } else {
        this.lastName = 'F.'
      }
    },
    getData: async function () {
      let response = await fetch('https://randomuser.me/api/?results=15');
      let data = await response.json();
      // this.listContacts = [];
      data.results.forEach(item => {
        const contact = new Object();

        contact.firstName = item.name.first;
        contact.lastName = item.name.last;
        contact.email = item.email;
        contact.city = item.location.city;
        contact.phone = item.phone
        contact.picture = item.picture.large;

        this.listContacts.push(contact)
      })
    },
    removeContact: function (index) {
      this.listContacts.splice(index, 1);
    }
  }

})

app.mount('#app')