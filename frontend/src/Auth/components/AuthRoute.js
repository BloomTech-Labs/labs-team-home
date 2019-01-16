// import React from 'react';
// import { Redirect } from 'react-router-dom';
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
// import { log } from 'util';

// const GET_USER = gql`
//   {
//     users {
//       _id
//     }
//   }
// `;

// const AuthRoute = ({ component: Component, ...rest }) => {
//   let
// 	return (
// 		<Query query={GET_USER}>
//       {({ loading, error, data }) => {
//       if (loading) return "Loading...";
//       if (error) return `Error! ${error.message}`;
//       if (data) {
//         console.log(data);
//       }
//       return (
//         <div>AKDJFKAD</div>
//       );
//     }}
//     </Query>
// 	);
// };

// export default AuthRoute;

// {/* <Redirect push to="/dashboard" />  */}
