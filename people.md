---
layout: default
title: People
section_id: people
categories:
  - internal: prof
    category: Professors
    desc: Professor
  - internal: postdoc
    category: Postdocs
    desc: Postdoc
  - internal: phd-student
    category: Ph.D. Students
    desc: Ph.D. Student
  - internal: masters
    category: Master's Students
    desc: Master's Student
  - internal: undergrad
    category: Undergraduate Students
    desc: Undergraduate Student
  - internal: visitor
    category: Visiting Scholars
    desc: Visiting Scholar
alumni_categories:
  - internal: alPHD
    category: Alumni (Ph.D. Students)
    desc: Alumni (Ph.D.)
  - internal: alMasters
    category: Alumni (Master's Students)
    desc: Alumni (Master's)
  - internal: alPostdocs
    category: Alumni (Postdocs)
    desc: Alumni (Postdocs)
  - internal: alVisitors
    category: Alumni (Visitors)
    desc: Alumni (Visitors)
  - internal: al
    category: Alumni
    desc: Alumni
---


<div class='full parallax page-hero' style='background-image: url(images/banner/banner.jpg);'>
  <div class='row'>
    <div class='large-12 columns'>
      {% include section-header.html title="The team" tagline="Current members and alumni of the IRL" class="big" %}
    </div>
  </div>
</div>


<h1 class="people-heading">
  Current Members
</h1>

<div class='full people-section'>
  <div class='row'>
    <div class='mod modGallery'>
      <div class='gallery-nav' aria-label='Filter current members by role'>
        <select class='gallery-filter-select' aria-label='Filter current members by role'>
          <option value='all'>All roles</option>
          {% for category in page.categories %}
            {% assign category_has_people = false %}
            {% for person in site.data.people %}
              {% if person.klass == category.internal %}
                {% assign category_has_people = true %}
                {% break %}
              {% endif %}
            {% endfor %}
            {% if category_has_people %}
              <option value='{{ category.internal }}'>{{ category.category }}</option>
            {% endif %}
          {% endfor %}
        </select>
        <ul>
          <li class='current'>
            <button data-cat='all' type='button' aria-pressed='true'>All</button>
          </li>
          {% for category in page.categories %}
            {% assign category_has_people = false %}
            {% for person in site.data.people %}
              {% if person.klass == category.internal %}
                {% assign category_has_people = true %}
                {% break %}
              {% endif %}
            {% endfor %}
            {% if category_has_people %}
              <li>
                <button data-cat='{{ category.internal }}' type='button' aria-pressed='false'>{{ category.category }}</button>
              </li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>

      <ul class='gallery people-grid'>

        {% for category in page.categories %}
          {% for person in site.data.people %}
            {% if person.klass == category.internal %}
            <li class="{{ person.klass }}">
            {% if person.link_to %}
              <a href='{{ person.link_to }}' target='_blank' rel='noopener noreferrer'>
            {% else %}
              <a href="javascript:void(0)">
            {% endif %}
              {% if person.image %}
                <img alt="" src="{{ '/images/groupPics/' | append: person.image | relative_url }}" />
              {% else %}
                <img class="profile-placeholder" alt="Profile photo unavailable" src="{{ '/images/people/default.svg' | relative_url }}" />
              {% endif %}
                <div class='overlay'>
                  <div class='thumb-info'>
                    <h3>{{ person.name }}</h3>
                    {% if person.desc %}
                      <p>{{ person.desc }}</p>
                    {% else %}
                      <p>{{ category.desc }}</p>
                    {% endif %}
                  </div>
                </div>
              </a>
            </li>
            {% endif %}
          {% endfor %}
        {% endfor %}

      </ul>
    </div>
  </div>

</div>

<h1 class="people-heading">
  Alumni
</h1>

<div class='full people-section'>
  <div class='row'>
    <div class='mod modGallery'>
      <div class='gallery-nav' aria-label='Filter alumni by role'>
        <select class='gallery-filter-select' aria-label='Filter alumni by role'>
          <option value='all'>All alumni</option>
          {% for category in page.alumni_categories %}
            {% assign category_has_people = false %}
            {% for person in site.data.people %}
              {% if person.klass == category.internal %}
                {% assign category_has_people = true %}
                {% break %}
              {% endif %}
            {% endfor %}
            {% if category_has_people %}
              <option value='{{ category.internal }}'>{{ category.category }}</option>
            {% endif %}
          {% endfor %}
        </select>
        <ul>
          <li class='current'>
            <button data-cat='all' type='button' aria-pressed='true'>All</button>
          </li>
          {% for category in page.alumni_categories %}
            {% assign category_has_people = false %}
            {% for person in site.data.people %}
              {% if person.klass == category.internal %}
                {% assign category_has_people = true %}
                {% break %}
              {% endif %}
            {% endfor %}
            {% if category_has_people %}
              <li>
                <button data-cat='{{ category.internal }}' type='button' aria-pressed='false'>{{ category.category }}</button>
              </li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>

      <ul class='gallery people-grid'>

        {% for category in page.alumni_categories %}
          {% for person in site.data.people %}
            {% if person.klass == category.internal %}
            <li class="{{ person.klass }}">
            {% if person.link_to %}
              <a href='{{ person.link_to }}' target='_blank' rel='noopener noreferrer'>
            {% else %}
              <a href="javascript:void(0)">
            {% endif %}
              {% if person.image %}
                {% assign person_image_dir = person.image_dir | default: 'alumniPics' %}
                <img alt="" src="{{ '/images/' | append: person_image_dir | append: '/' | append: person.image | relative_url }}" />
              {% else %}
                <img class="profile-placeholder" alt="Profile photo unavailable" src="{{ '/images/people/default.svg' | relative_url }}" />
              {% endif %}
                <div class='overlay'>
                  <div class='thumb-info'>
                    <h3>{{ person.name }}</h3>
                    {% if category.internal == "alPHD" %}
                      <p>
                        Graduated {{ person.year }}<br />
                        Thesis: "{{ person.thesis }}"<br />
                        <br />
                        <strong>{{ person.employment }}</strong>
                      </p>
                    {% elsif category.internal == "alMasters" %}
                      <p>
                        Graduated{% if person.year %} {{ person.year }}{% endif %}
                        {% if person.status %}
                          <br />
                          <br />
                          <strong>{{ person.status }}</strong>
                        {% endif %}
                      </p>
                    {% elsif category.internal == "alPostdocs" %}
                      <p>
                        <!-- {{ person.desc }}<br /> -->
                        Left {{ person.time }}<br />
                        <br />
                        <strong>{{ person.status }}</strong>
                      </p>
                    {% elsif category.internal == "alVisitors" %}
                      <p>
                        {{ person.desc }}<br />
                        <br />
                        {{ person.time }}
                      </p>
                    {% elsif category.internal == "al" %}
                      <p>
                        {% if person.graduated %}
                          Graduated{% if person.year %} {{ person.year }}{% endif %}
                        {% else %}
                          Left{% if person.time %} {{ person.time }}{% endif %}
                        {% endif %}
                        {% if person.desc %}
                          <br />
                          {{ person.desc }}
                        {% endif %}
                        {% if person.status %}
                          <br />
                          <br />
                          <strong>{{ person.status }}</strong>
                        {% endif %}
                      </p>
                    {% else %}
                      {% if person.desc %}
                        <p>{{ person.desc }}</p>
                      {% else %}
                        <p>{{ category.desc }}</p>
                      {% endif %}
                    {% endif %}
                  </div>
                </div>
              </a>
            </li>
            {% endif %}
          {% endfor %}
        {% endfor %}

      </ul>

    </div>
  </div>

</div>
