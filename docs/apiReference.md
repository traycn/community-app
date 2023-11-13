## API Reference

#### CREATE a Post

```
  POST /create-post
```

| Parameter | Type     | Description                |
| :-------- | :------- | -------------------------- |
| `text`    | `string` |        **Required**        |
| --- | --- | --- |
| `author`  | `string` |        **Required**        |

#### READ all Posts

```NEXT action
  fetchPosts - lib/actions/post.actions.ts 
```

| Parameter | Type     | Description                       |
| --- | --- | --- |
| `NONE`    | `NONE`   |                                   |

#### READ single Post

```NEXT action
  fetchPostById - lib/actions/post.actions.ts 
```

| Parameter | Type     | Description                       |
| --- | --- | --- |
| `id`      | `string` |           **Required**            |

#### POST single Post

```NEXT action
  addCommentToPost - lib/actions/post.actions.ts 
```

| Parameter | Type     | Description                       |
| --- | --- | --- |
| `postId`      | `string` |           **Required**            |
| --- | --- | --- |
| `commentText`    | `string` |        **Required**        |
| --- | --- | --- |
| `userId`  | `string` |        **Required**        |
| --- | --- | --- |
| `path`    | `string` |        **Required**        |

... and more ...