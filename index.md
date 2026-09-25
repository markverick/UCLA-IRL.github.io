---
layout: default
section_id: home
slides:
  - bg: images/@stock/slide-1.jpg
    small_title:
      klass: bottom-to-top
      text: The perfect theme for
    title:
      klass: bottom-to-top
      text: Many purposes
    buttons:
      klass: bottom-to-top
      items:
        - text: Learn More
          link_to: http://themeforest.net/user/honryou/portfolio?ref=honryou
  - bg: images/@stock/slide-4.jpg
    klass: centered-text
    small_title:
      klass: bottom-to-top
      text: We make websites that are
    title:
      klass: bottom-to-top
      text: Creative &amp; Powerful
    buttons:
      klass: bottom-to-top
      items:
        - klass: boxed
          text: View Features
          link_to: http://themeforest.net/user/honryou/portfolio?ref=honryou
        - text: Purchase Now
          link_to: http://themeforest.net/user/honryou/portfolio?ref=honryou
  - bg: images/@stock/slide-5.jpg
    small_title:
      klass: bottom-to-top
      text: This is a creative theme that you'll
    title:
      klass: bottom-to-top
      text: definitely love...
    buttons:
      klass: bottom-to-top
      items:
        - text: Learn More
          link_to: http://themeforest.net/user/honryou/portfolio?ref=honryou



works:
  - image: images/paperPictures/1.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/2.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/3.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/4.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/5.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/6.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/7.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]
  - image: images/paperPictures/8.png
    title: [Paper Picture]
    link_to: publications.html
    klass: graphi-design
    desc: [Paper Picture Description]



---



<div class='full parallax page-hero home-hero' style='background-image: url(images/banner/banner.jpg);'>
  <div class='row'>
    <div class='large-12 columns'>
      {% include section-header.html title="Internet Research Laboratory" tagline="University of California, Los Angeles (UCLA)" class="big" %}
    </div>
  </div>
</div>

<div class='row intro-section'>
  <div class='large-12 columns'>
    <h2>
      Welcome
    </h2>

    <p class="lead">
      Welcome to the Internet Research Laboratory (IRL), part of the <a href="https://cs.ucla.edu" target="_blank">Computer Science</a> department at the <a href="https://ucla.edu" target="_blank">University of California, Los Angeles (UCLA)</a>. The IRL's research primarily focuses on <a href="https://named-data.net" target="_blank">Named Data Networking</a>. Previously, our research covered fault tolerance in large scale distributed systems, Internet routing infrastructure, inter-domain routing, and protocol design principles for large-scale, self-organizing systems. Our group has produced numerous <a href="publications.html">publications</a> over the years.
    </p>

    <p class="lead">
      The Internet Research Laboratory is headed by <a href="http://www.cs.ucla.edu/~lixia/" target="_blank">Prof. Lixia Zhang</a>.
    </p>
  </div>
</div>


<!--
<div class="spacing">

</div>

<div class="full" style="background: var(--color-surface-subtle);">
  <div class="row">
    <div class="large-12 columns">
      {% include section-header.html title="Our works" %}
      <div class="spacing"></div>
      <p style="font-size:15px">
        The IRL's recent papers have been predominantly concerned with Named Data Networking. In particular, our most recent focus has been on security in NDN -- through name-based access control, distributed ledger systems, and cryptography, NDN in various enviornments -- such as vehicular networking, and routing in large-scale NDN systems.
      </p>
      <div class="three spacing"></div>
    </div>
  </div>


  <div class="mod modGallery">
    <ul class="gallery small-block-grid-2 medium-block-grid-3 large-block-grid-4">
      {% for work in page.works %}
        <li class="{{ work.klass }}">
          <a href='{{ work.link_to }}'>
            <img alt="" src="{{ work.image }}" />
            <div class='overlay'>
              <div class='thumb-info'>
                <h3>{{ work.title }}</h3>
                <p>{{ work.desc }}</p>
              </div>
            </div>
          </a>
        </li>
      {% endfor %}
    </ul>
  </div>
</div>
-->


<div class='full section-heading projects-section'>
  <div class='row'>
    <div class='large-12 columns'>
      {% include section-header.html title="Our recent projects" %}
    </div>
  </div>
<div class='row cards-grid project-grid'>
  {% for project in site.data.projects %}
      <div class='large-4 medium-4 columns{% if forloop.last %} end{% endif %}'>
        <div class='mod modBlogPost'>
          <div class='content'>
            <p class='date'>{{project.year}}</p>
            <h4><a href="{{project.url}}">{{project.name}}</a></h4>
            <p>{{project.abs}}</p>
            <!--
              <div class="tags">
                {% for cat in post.categories %}
                  <a href="#">{{cat | capitalize}}</a>
                  {% unless forloop.last %}
                    ,
                  {% endunless %}
                {% endfor %}
              </div>
            -->
          </div>
        </div>
      </div>

    {% endfor %}

  </div>
</div>

<div class='full content-section posts-section'>
  <div class='row'>
    <div class='large-12 columns'>
      {% include section-header.html title="Our recent posts" %}
      <p>
        Here are the most recent blog posts from the members of the IRL team.
      </p>
    </div>
  </div>

  <div class='row'>
    {% for post in site.posts %}
      {% if forloop.index > 3 %}
        {% break %}
      {% endif %}

      <div class='large-4 medium-4 columns'>
        <div class='mod modBlogPost'>
          {% for image in post.images %}
            {% unless forloop.first %}
              {% break %}
            {% endunless %}
            <a href="{{ post.url | relative_url }}"><img alt="" src="{{ image | relative_url }}" /></a>
          {% endfor %}
          <div class='content'>
            <p class='date'>{{post.date | date: "%B %d, %Y" }}</p>
            <h4><a href="{{ post.url | relative_url }}">{{post.title}}</a></h4>
            <p class="post-summary">{{ post.excerpt | strip_html | strip_newlines | truncatewords: 28 }}</p>
            <a class="read-more" href="{{ post.url | relative_url }}" aria-label="Read more about {{ post.title | escape }}">Read more <span aria-hidden="true">&rarr;</span></a>
            <!--
              <div class="tags">
                {% for cat in post.categories %}
                  <a href="#">{{cat | capitalize}}</a>
                  {% unless forloop.last %}
                    ,
                  {% endunless %}
                {% endfor %}
              </div>
            -->
          </div>
        </div>
      </div>

    {% endfor %}

  </div>


  <div class='row'>
    <div class='large-12 columns'>
      <p class='centered-text'>
        <a class='button' href='{{ "/blog" | relative_url }}'>See more posts</a>
      </p>
    </div>
  </div>
</div>
