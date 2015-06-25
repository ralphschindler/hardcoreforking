var React = require('react');

var Footer = React.createClass({
  render: function () {
    return (
      <footer className="site-footer">
        <div className="text-center">
          Offers.com
          <a href="" className="go-top">
            <i className="fa fa-angle-up"></i>
          </a>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;