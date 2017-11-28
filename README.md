# &lt;read-time&gt;

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/matthewp/read-time)
[![npm version](https://img.shields.io/npm/v/read-time-wc.svg?style=flat-square)](https://www.npmjs.com/package/read-time-wc)

A component for calculating how long it will take to read an article.

![demo](http://i.imgur.com/UC3Oumk.png)

## Install

Install with npm or yarn:

```shell
yarn add read-time-wc
```

Import into your page

```html
<script type="module" href="./node_modules/read-time-wc/read-time.js"></script>
```

## Usage

`<read-time>` takes a `selector` that contains the article you want to calculate the read time for. For example:

```html
<read-time selector="#lorem"></read-time>

<article id="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo lorem sit amet fringilla interdum. Morbi imperdiet eros id ante tempus commodo. Fusce pretium metus tortor, a lacinia nulla tincidunt nec. Vestibulum placerat consequat ipsum, interdum fringilla lectus malesuada eget. Cras vitae dui luctus lectus viverra eleifend in sed sapien. Quisque sit amet elit ligula. Vestibulum facilisis pretium libero ultricies vehicula. Donec arcu diam, rhoncus sit amet purus et, porttitor auctor quam. Ut nec metus eget enim iaculis mollis non non arcu.</article>
```

## Attributes

### Selector

A CSS selector of the article who's read time will be calculated. Can be any selector that can be found by `querySelector`.

This field is **required**.

```html
<read-time selector=".opinion-piece"></read-time>
```

### WPM

The number of words-per-minute of the reader. Defaults to `200`. If your audience is faster/slower, adjust this attribute to get a more accurate read time.

```html
<read-time selector=".amazing-article" wpm="400"></read-time>
```
