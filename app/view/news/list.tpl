<html lang="zh-CN">
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/app/public/css/news.css"/>
</head>
<body>
<ul class="news-view view">
    {% for item in list %}
    <li class="item">
        <a href="{{ item.url }}">{{ item.title }}</a>
    </li>
    {% endfor %}
</ul>
</body>
</html>
