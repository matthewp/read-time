# &lt;read-time&gt;

A component for calculating how long it will take to read an article.

![demo](http://i.imgur.com/UC3Oumk.png)

## Install

Install with [Bower](http://bower.io/):

```shell
bower install --save read-time
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
