import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const names = ['John', 'Sara', 'Budd', 'Smith', 'Deey'];

const peopleData = [];

const generatePerson = i => {
  const id = i + 1;
  const randomFirstNameIndex = getRandomInt(0, names.length);
  const randomLastNameIndex = getRandomInt(0, names.length);
  const name = [ names[randomFirstNameIndex], names[randomLastNameIndex] ].join(" ");
  return {
    id,
    name
  };
};

for (let i = 0; i < 1000; i++) {
  peopleData.push(generatePerson(i));
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      args: {
        id: { type: GraphQLID },
        lastId: { type: GraphQLID }
      },
      resolve: (source, args) => {
        console.log('args: ', args);
        const id = parseInt(args.id, 10);
        const lastId = args.lastId ? parseInt(args.lastId, 10) + 1: id;
        const limit = 10;
        const wantedIds = [];
        for (let i = lastId; i < (id + limit); i++) {
          wantedIds.push(i);
        }
        const results = peopleData.reduce((acc, val) => {
          if (wantedIds.includes(val.id)) {
            acc.push(val);
          }
          return acc;
        }, []);
        return results;
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
