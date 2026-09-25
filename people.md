---
layout: default
title: People
section_id: portfolio
categories:
  - internal: prof
    category: Professors
    desc: Professor
  - internal: postdoc
    category: Postdocs
    desc: Postdoc
  - internal: phd-candidate
    category: Ph.D. Candidates
    desc: Ph.D. Candidate
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


<div class='full parallax' style='background-image: url(images/banner/banner.jpg); color: var(--color-text-on-dark);'>
  <div class='row'>
    <div class='large-12 columns'>
      {% include section-header.html title="The team" tagline="Current members and alumni of the IRL" class="big" %}
    </div>
  </div>
  <div class='four spacing'></div>
</div>


<div class='four spacing'></div>

<h1 style="text-align: center;">
  Current Members
</h1>

<div class='full'>
  <div class='row'>
    <div class='mod modGallery'>
      <div class='gallery-nav'>
        <ul>
          <li class='current'>
            <a data-cat='all' href='#'>All</a>
          </li>
          {% for category in page.categories %}
            <li>
              <a data-cat='{{ category.internal }}' href='#'>{{ category.category }}</a>
            </li>
          {% endfor %}
        </ul>
      </div>

      <ul class='gallery small-block-grid-5'>

        {% for category in page.categories %}
          {% for person in site.data.people %}
            {% if person.klass == category.internal %}
            <li class="{{ person.klass }}">
            {% if person.link_to %}
              <a href='{{ person.link_to }}'>
            {% else %}
              <a href="javascript:void(0)">
            {% endif %}
              {% if person.image %}
                <img alt="" src="/images/groupPics/{{ person.image }}" />
              {% else %}
                <img alt="" src="/images/@stock/work-7.jpg" />
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

  <div class='four spacing'></div>
</div>

<h1 style="text-align: center;">
  Alumni
</h1>

<div class='full'>
  <div class='row'>
    <div class='mod modGallery'>
      <div class='gallery-nav'>
        <ul>
          <li class='current'>
            <a data-cat='all' href='#'>All</a>
          </li>
          {% for category in page.alumni_categories %}
            <li>
              <a data-cat='{{ category.internal }}' href='#'>{{ category.category }}</a>
            </li>
          {% endfor %}
        </ul>
      </div>

      <ul class='gallery small-block-grid-5'>

        {% for category in page.alumni_categories %}
          {% for person in site.data.people %}
            {% if person.klass == category.internal %}
            <li class="{{ person.klass }}">
            {% if person.link_to %}
              <a href='{{ person.link_to }}'>
            {% else %}
              <a href="javascript:void(0)">
            {% endif %}
              {% if person.image %}
                <img alt="" src="/images/{{ person.image_dir | default: 'alumniPics' }}/{{ person.image }}" />
              {% else %}
                <img alt="" src="/images/@stock/work-7.jpg" />
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

  <div class='four spacing'></div>
</div>
