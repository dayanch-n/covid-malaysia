% Knowledgebase
% Facts
state_registration(johor, 801267209).
state_registration(kedah, 381775777).
state_registration(kelantan, 258368353).
state_registration(melaka, 188532090).
state_registration(negeri_sembilan, 243650261).
state_registration(pahang, 285145365).
state_registration(perak, 455013525).
state_registration(perlis, 47633359).
state_registration(pulau_pinang, 380758940).
state_registration(sabah, 443783415).
state_registration(sarawak, 498580177).
state_registration(selangor, 1447204206).
state_registration(terengganu, 204709755).
state_registration(wp_kuala_lumpur, 540920146).
state_registration(wp_labuan, 18427840).
state_registration(wp_putrajaya, 26449297).

% Rules
state_registration_list(List):- findall({"state": State, "registration": Registration},(state_registration(State, Registration)), List), write(List).
state_registration_list_asc(List):- findall({"state" : X, "registration" : Y}, state_registration(X, Y), List), sort(List, List), write(List).
state_registration_list_desc(List):- findall({"state" : X,"registration" : Y}, state_registration(X, Y), List), sort(List, List), reverse(List, Reseult), write(Reseult).
