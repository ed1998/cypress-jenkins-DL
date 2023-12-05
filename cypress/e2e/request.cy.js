const dayjs = require('dayjs')

describe('Request Demo', () =>{
    it('Get API Request', () =>{
        cy.request('GET', 'https://reqres.in/api/users/1').as('getUser')
        
        cy.get('@getUser').should((response)=>{
            expect(response.status).to.equals(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data).to.have.property('id')
            expect(response.body.data).to.have.property('email')
            expect(response.body.data.email).to.equals('george.bluth@reqres.in')            
        })
    })

    it('Post API request', function(){
        cy.fixture('user').as('data')
        
        cy.request('POST', 'https://reqres.in/api/users', this.data).as('createUser')

        cy.get('@createUser').should((response)=>{
            expect(response.status).to.equals(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('createdAt')
            expect(response.body.id).to.be.a('string')            
        })
    })

    it('Patch API request', function(){
        cy.fixture('user-update').as('data')
        
        cy.request('PATCH', 'https://reqres.in/api/users/1', this.data).as('userUpdate')

        cy.get('@userUpdate').should((response)=>{
            expect(response.status).to.equals(200)
            expect(response.body).to.have.property('updatedAt')
            expect(response.body.updatedAt).to.include(dayjs().format('YYYY-MM'))            
        })
    })
    it.only('Delete API request', function(){
        cy.fixture('user').as('data')
        let user = this.data
        function createUser() {
            return fetch('https://reqres.in/api/users', {
                method: "post", 
                body: user
            })
        }

        let id
        cy.wrap(null).then(() => {
            //promise
            return createUser().then((response) => id = response.body.id)
        })
        cy.request('DELETE', 'https://reqres.in/api/users/${id}').as('deleteUser')
        cy.get('@deleteUser').should((response) => {
            expect(response.status).to.equals(204)
        })        
        })
    })
