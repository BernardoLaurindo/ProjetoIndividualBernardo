Table users {
  id int [pk, increment]
  name varchar
  email varchar [unique]
  password varchar
  created_at datetime
}

Table categories {
  id int [pk, increment]
  name varchar
  description text
  user_id int [ref: > users.id]
}

Table priorities {
  id int [pk, increment]
  level varchar // ex: Alta, Média, Baixa
}

Table tasks {
  id int [pk, increment]
  title varchar
  description text
  due_date datetime
  status varchar // ex: "pendente", "em andamento", "concluída"
  user_id int [ref: > users.id]
  category_id int [ref: > categories.id]
  priority_id int [ref: > priorities.id]
  created_at datetime
  updated_at datetime
}

Table comments {
  id int [pk, increment]
  task_id int [ref: > tasks.id]
  user_id int [ref: > users.id]
  content text
  created_at datetime
}

Table attachments {
  id int [pk, increment]
  task_id int [ref: > tasks.id]
  file_url varchar
  uploaded_at datetime
}

Table tags {
  id int [pk, increment]
  name varchar
}

Table task_tags {
  task_id int [ref: > tasks.id, pk]
  tag_id int [ref: > tags.id, pk]
}


Table task_history {
  id int [pk, increment]
  task_id int [ref: > tasks.id]
  user_id int [ref: > users.id]
  field_changed varchar
  old_value text
  new_value text
  changed_at datetime
}
