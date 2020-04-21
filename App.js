import React, {Component } from 'react';
import { Button, StyleSheet,Text, View, Alert, SafeAreaView} from 'react-native';
import BookEntry from './src/components/BookEntry'
import GetBook from './src/components/GetBook'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      books: [],
      listISBN: [],
    }

    this.getBook = this.getBook.bind(this)
  }
   // 978006093019 isbn 13
   // 0060930217 isbn 10

   getBook(params) {
    return fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${params}&jscmd=data&format=json`)
    .then((response) => response.json())
    .then((book) => {
      if (JSON.stringify(book) === '{}') {
        Alert.alert(
          'Invalid ISBN:',
          'Cannot Fetch Details of Book',
          [
            {
              text: 'OK',
              onPress: () => {return 'ok'},
              style: 'OK',
            }
          ]
        )
      } else {
        console.log('fetched')
        let ISBN = '';
        for (const key in book) {
          ISBN = key
        }
        const details = book[ISBN]
        const author = details.authors[0].name;
        const title = details.title;
        const cover = details.cover.large;
        const length = details.number_of_pages;
        let bookData = {
          ISBN: ISBN,
          author: author,
          title: title,
          cover: cover,
          length: length,
        }

        let temp = [ISBN, bookData]
        this.setState({
          books:[...this.state.books, bookData],
          listISBN: [...this.state.listISBN, ISBN],
          updated: true,
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {updated} = this.state;
      if (!updated) {
        return (
          <SafeAreaView style={styles.main}>
            <View style={styles.input}>
              <GetBook getBook={this.getBook} />
            </View>
            <View>
              <Text>
                No Books!
              </Text>
            </View>
          </SafeAreaView>
        )
      } else {
        let DATA = [];
        return (
          <SafeAreaView style={styles.main}>
              <GetBook getBook={this.getBook} />
            <View style={styles.main}>
              {console.log(this.state.books)}
            </View>
          </SafeAreaView>
        )
      }
  }


}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    top: '15%',
  }
})

//bookInfo[ISBN]:

/*  {
  "authors": [
     {
      "name": "Thomas Pynchon",
      "url": "https://openlibrary.org/authors/OL4423376A/Thomas_Pynchon",
    },
  ],
  "cover":  {
    "large": "https://covers.openlibrary.org/b/id/40630-L.jpg",
    "medium": "https://covers.openlibrary.org/b/id/40630-M.jpg",
    "small": "https://covers.openlibrary.org/b/id/40630-S.jpg",
  },
  "ebooks": [
     {
      "availability": "borrow",
      "borrow_url": "https://openlibrary.org/books/OL7284980M/V._(Perennial_Classics)/borrow",
      "checkedout": false,
      "formats":  {},
      "preview_url": "https://archive.org/details/vperennialclassi00thom",
    },
  ],
  "excerpts": [
     {
      "comment": "",
      "first_sentence": true,
      "text": "Christmas Eve, 1955, Benny Profane, wearing black levis, suede jacket, sneakers and big cowboy hat, happened to pass through Norfolk, Virginia.",
    },
     {
      "comment": "",
      "text": "Christmas Eve, 1955, Benny Profane, wearing black levis, suede jacket, sneakers and big cowboy hat, happened to pass through Norfolk, Virginia.",
    },
  ],
  "identifiers":  {
    "goodreads": [
      "410",
    ],
    "isbn_10": [
      "0060930217",
    ],
    "isbn_13": [
      "9780060930219",
    ],
    "librarything": [
      "8883",
    ],
    "openlibrary": [
      "OL7284980M",
    ],
  },
  "key": "/books/OL7284980M",
  "number_of_pages": 533,
  "publish_date": "April 1, 1999",
  "publishers": [
     {
      "name": "Harper Perennial Modern Classics",
    },
  ],
  "title": "V. (Perennial Classics)",
  "url": "https://openlibrary.org/books/OL7284980M/V._(Perennial_Classics)",
} */
