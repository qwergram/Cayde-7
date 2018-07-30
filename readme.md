# What is this
The idea is simple: fast dashboards. I define data pipelines over at [pengrabot](https://pengrabot.ddns.net) and create JSON representations of widgets that display the data in meaningful ways. The JSON representations of widgets are realized as widgets in this repo.

Additionally, this repo is quite portable, allowing instant access to large datasets at any hackathon. It is also deployed at [qwergram.github.io](https://qwergram.github.io).

## For example:

[https://pengrabot.ddns.net/api/widget_templates/3/](https://pengrabot.ddns.net/api/widget_templates/3/) is a widget template for databars. [https://pengrabot.ddns.net/api/widgets/3/](https://pengrabot.ddns.net/api/widgets/3/) utilizes this template and currently renders it as html on a dashpage. The data it pulls is currently from a pipeline defined at [https://pengrabot.ddns.net/api/datasources/14/](https://pengrabot.ddns.net/api/datasources/14/).

# Reason
The end goal of this project is to recognize correlations between different pipelines of data. An easy example is the [currency exchange rates](https://pengrabot.ddns.net/api/datasources/2/) of the USD and other nations and the [S&P 500's price](https://pengrabot.ddns.net/api/datasources/9/). Perhaps there are more correlations between seemingly unrelated data sources. The more data piplines there are, the more potential correlations there are. Additionally, the server is also running instances of tensorflow scripts between two to fifteen data pipelines at a time to further find correlations. 

One might make the comment that this is quite primitive; noted and acknoledged. But this is more of an interesting hobby and learning exercise than robust product. That being said, any improvements/suggestions are welcomed.
