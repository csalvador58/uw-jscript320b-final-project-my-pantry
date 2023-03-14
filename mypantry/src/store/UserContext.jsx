import React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({
  isLoggedIn: false,
  updateLogin: () => {},
  pantry: [],
  updatePantry: () => {},
  recipes: [],
  updateRecipe: () => {},
});

export default UserContext;

UserContext.PropTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateLogin: PropTypes.func.isRequired,
  pantry: PropTypes.array.isRequired,
  updatePantry: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  updateRecipe: PropTypes.func.isRequired,
};

//  action: {
//   type: 'add' | 'update' | 'delete'
//   data: {
//     collection = 'pantry' | 'recipe',
//     object = {
//         If pantry, then:

//         name: ,
//         type: ,
//         qty: ,
//         unit: ,

//         if recipe, then:

//         name: ,
//         ingredients: {
//             name: ,
//             type: ,
//             qty: ,
//             unit: ,
//         }
//         favorite: ,
//     }
//     isIngredient: true or false
//     ingredients: {
//             name: ,
//             type: ,
//             qty: ,
//             unit: ,
//         }
//     update = {key: value}
//   }
// }
