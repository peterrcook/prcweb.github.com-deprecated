---
layout: post
title: async visualisation
permalink: async-visualisation
description: Blog entry on visualising event attendence data using data visualisation library D3.js
---
<h3>Visualising event attendance using D3.js</h3>

<p>During the summer months of 2012, <a href="http://l4rp.com">The Lab for the Recently Possible</a> held 3 data visualisation <a href="http://l4rp.com/datavizlab/">lab days</a> in which a group of artists, programmers and other interested parties met up to create and experiment with data visualisation.</p>

<p>Amongst the topics explored were:</p>
<ul>
	<li>vast amounts of call-centre data from Age UK</li>
	<li><a href="http://dharmafly.com/energy-visualisation">domestic energy consumption</a></li>
	<li><a href="http://dharmafly.com/athens-dataviz">attacks on migrants in Athens, Greece</a></li>
</ul>
<p>The originator of the lab days, <a href="http://premasagar.com/">Premasagar Rose</a>, was also keen for us to explore different ways of visualising and presenting attendance data from a series of regular talks on JavaScript called <a href="http://asyncjs.com">Async</a>. To help us with this, he supplied data from the <a href="http://lanyrd.com/2013/asyncjs-d3/">Lanyrd</a> website containing vast quantities of information of who's attended which sessions.</p>

<p>I took on this challenge and looked at a couple of ways of visualising this data. Both of the resulting visualisations show how many people attended sessions of a given topic (e.g. front-end, architecture, games).</p>

<h3>Heat Matrix</h3>
<p>The first is a 'heat matrix', which is a grid of squares coloured or shaded according to a given value. In this case, each row represents a topic and each column an attendee. The darker the value, the more times that attendee has been to a talk of that topic.</p>

<a href="http://static.dharmafly.com/asyncjs-attendee-matrix/"><img title="Async Category-Attendence Matrix" src="/img/Async-Category-Attendence-Matrix1.jpg" alt="Async Category-Attendence Matrix" width="593" height="306" /></a>

<p>The rows and columns can be sorted by clicking on their titles. For example, if you want to ascertain someone's favourite topics, click on their name and their topics, ranked by attendance, will be shown.</p>

<h4>Implementation</h4>
<p>I chose to use the <a href="http://d3js.org">D3.js</a> JavaScript library for this as it is geared towards this sort of visualisation. Loosely speaking, the attendance values are represented as a 2x2 array and this data is bound to DOM elements, specifically SVG rectangle elements. D3 facilitates the creation of the rectangle elements from the data array and also makes the shading of them based on frequency of attendance very straightforward.</p>

<h3>Avatars ranked by attendance</h3>
<p>The second visualisation has a friendlier look as it uses the avatars of the attendees and lists them in order of attendance, according to a chosen topic.</p>

<a href="http://static.dharmafly.com/asyncjs-attendee-categories/"><img title="Async Categorised Attendence" src="/img/Async-Categorised-Attendence.jpg" alt="" width="517" height="393" /></a>

<p>The user can click on a topic and all the attendees of that topic's sessions are displayed with the most frequent attendee listed first.</p>

<p>We also thought it'd be interesting to show whether any attendees have a stronger interest in a particular topic. For example, has anyone visited only graphics sessions? This probably indicates that they have a strong interest in graphics. We did this by computing each attendee's favourite topic, attaching this to the attendee's data and surrounding their avatar with a yellow border.</p>

<h4>Implementation</h4>
<p>As with the first visualisation, I used the D3 library as this is another application where data is bound to DOM elements. In this case, a one-dimensional array of attendee objects (containing avatar URL, name, favourite topic etc.) is bound to a selection of image elements. Many examples of D3 visualisations employ SVG but this is an example that operates on common HTML elements.</p>

<h3>Wrap up</h3>
<p>It was interesting to work on two different visualisations of essentially the same dataset. The first was a more obvious idea but it's not particularly visually appealing and arguably displays more than is necessary. Having said that, it is useful for looking up a particular user to see what their favourite topics are. The second I think simpler, more friendly and easier to understand.</p>