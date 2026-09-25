---
layout: default
title: RFCs
section_id: rfc
---

<div class="full parallax page-hero" style="background-image: url(images/banner/banner.jpg);">
  <div class="row">
    <div class="large-12 columns">
      {% include section-header.html title="RFC" tagline="" class="big" %}
    </div>
  </div>
</div>

<div class="row notice-panel">
  Over the years, members of the IRL have contributed to a number of IETF Request for Comments (RFCs).
  We list all known RFC contributions here.

</div>
<div class="row document-list">

{% assign current_year = site.time | date: "%Y" %}
{% assign months = "January,February,March,April,May,June,July,August,September,October,November,December" | split: "," %}
{% for year in (1997..current_year) reversed %}
  {% assign is_publication_for_year = false %}
  {% for pub in site.data.publications %}
    {% if pub.type == "rfc" %}
      {% if pub.year == year %}
        {% assign is_publication_for_year = true %}
      {% endif %}
    {% endif %}
  {% endfor %}

  {% if is_publication_for_year %}
    <h3>{{ year }}</h3>
    <ul>
    {% for month in months reversed %}
      {% for pub in site.data.publications %}
        {% assign pub_month_downcase = pub.month | downcase %}
        {% assign month_downcase = month | downcase %}
        {% if pub.year == year and pub_month_downcase == month_downcase %}
          {% if pub.type == "rfc" %}
            <li>
              {{ pub.authors }}<br />
              <strong>"{{ pub.title }}"</strong><br />
              <em>RFC {{ pub.number }}</em>, {{ month }} {{ year }}.<br />
              {% if pub.note %}
                <em>{{ pub.note }}</em><br />
              {% endif %}
              <a href="https://www.rfc-editor.org/rfc/rfc{{ pub.number }}.html" target="_blank"><img src="images/extensions/html.png" alt="HTML" /></a>
            </li>
          {% endif %}
        {% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
  {% endif %}
{% endfor %}

</div>
