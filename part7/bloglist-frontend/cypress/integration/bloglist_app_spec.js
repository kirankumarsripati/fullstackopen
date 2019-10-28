/// <reference types='Cypress' />

describe('Bloglist ', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Kirankumar Sripati',
      username: 'kirankumar',
      password: 'secret123',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)


    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Login to application')
  })

  it('verify login/out to application', () => {
    cy.get('#username').type('kirankumar')
    cy.get('#password').type('secret123')
    cy.get('#login').click()
    cy.contains('Kirankumar Sripati logged in')
    cy.contains('add blog')
    cy.get('#logout').click()
    cy.contains('Login to application')
  })

  it('should show invalid login', () => {
    cy.get('#username').type('demo')
    cy.get('#password').type('demo')
    cy.get('#login').click()
    cy.contains('wrong username or password')
  })

  describe('blogs', () => {
    beforeEach(() => {
      cy.get('#username').type('kirankumar')
      cy.get('#password').type('secret123')
      cy.get('#login').click()
    })

    it('should add blog, comment and update likes', () => {
      cy.get('#addBlog').click()
      cy.get('#blogTitle').type('My awsome blog')
      cy.get('#blogAuthor').type('Kirankumar')
      cy.get('#blogUrl').type('https://kirankumar.sripati/blog/1')
      cy.get('#createBlog').click()
      cy.contains('My awsome blog')
      cy.get('#blogs')
        .contains('My awsome blog')
        .click()
      cy.contains('My awsome blog Kirankumar')

      cy.get('#comment').type('nice blog!')
      cy.get('#addComment').click()
      cy.contains('nice blog!')

      cy.get('#blogLikes').contains(0)
      cy.get('#likeButton').click()
      cy.get('#blogLikes').contains(1)
      cy.get('#likeButton').click()
      cy.get('#blogLikes').contains(2)
    })
  })
})
