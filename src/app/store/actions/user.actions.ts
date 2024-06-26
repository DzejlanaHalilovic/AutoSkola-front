import { createAction, props } from "@ngrx/store";

import { User } from "src/app/interfaces/User";

export const login = createAction(
  '[Login Component] LoginUser', props<User>()
);

export const logout = createAction('[Navigation Component LogoutUser]');

export const updateUser = createAction( '[Update-user Component] Updateuser', props<{ painter: any}>()
);
export const dodela = createAction( '[Admin-page Component] Adminpage', props<{ painter: any}>()
);
//export const addArtsPainting = createAction('[add-arts-painting]', props<{dela : any}>());
