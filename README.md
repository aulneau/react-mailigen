# React Mailigen

This is a renderless react component to help you subscribe users to your mailigen lists.

## Getting started

### Installation

```
yarn add react-mailigen
```

### Example

```jsx
import Mailigen from 'react-mailigen';

<Mailigen email={this.state.email}>
  {({loading, error, success, doSubscribe}) =>
    (<form onSubmit={doSubscribe}>
        <!-- form content -->
    </form>)
  }
</Mailigen>
```

### Props

The component takes the following props:

- `email`: The email address you want to add to your list
- `from`: The email address you want to add to your list
- `id`: (optional) the List ID you want the emails to be added to (defaults to: `process.env.MAILIGEN_LIST`)
- `apiKey`: (optional) the apiKey for your account (defaults to: `process.env.MAILIGEN_API_KEY`)
- `options`: any other options you'd like to pass to your list

#### See also
- [`mailigen-js`](https://github.com/hstove/mailigen-js) - This simple library gives you the ability to add email to your newsletter lists on Mailigen.
