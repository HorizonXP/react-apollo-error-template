import React, { Component } from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import * as DirectoryActions from './reducers/directory';

class App extends Component {
  render() {
    const { loading, people, setId, loadMore } = this.props;
    const newId = people ? people[people.length - 5].id : 1;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div>
            <button onClick={loadMore}>Load more...</button>
            <button onClick={() => { setId(newId); loadMore() }}>Set Id to {newId} and load more...</button>
            <ul>
              {people.map(person => (
                <li key={person.id}>
                  {person.id} - {person.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    );
  }
}

const gqlQuery = graphql(
  gql`query Directory($id: ID!, $lastId: ID) {
    people(id: $id, lastId: $lastId) {
      id
      name
    }
  }`,
  {
    options: ({ id }) => ({
      variables: {
        id
      }
    }),
    props: ({
      ownProps: {
        id
      },
      data: {
        loading,
        people,
        fetchMore
      }
    }) => {
      return {
        loading,
        people,
        loadMore() {
          return fetchMore({
            variables: {
              id,
              lastId: people[people.length - 1].id // last Id for which we already have data
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.directory) {
                return prev;
              }
              return {
                ...prev,
                directory: [...prev.directory, ...fetchMoreResult.directory]
              }
            }
          });
        }
      }
    }
  }
);

const mapStateToProps = state => ({
  id: state.directory.id
})

const mapDispatchToProps = DirectoryActions;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  gqlQuery
)(App)
